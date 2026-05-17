/**
 * audio-processor.js — PCM16 AudioWorklet processor
 *
 * HOW IT WORKS (for devs reading this):
 *
 * The Web Audio API gives us floating-point audio samples in the range [-1.0, 1.0].
 * xAI's Realtime API requires PCM16 — raw 16-bit signed integers at 24kHz, mono.
 * This AudioWorklet runs on a dedicated audio thread (not the main JS thread)
 * and converts the float samples to int16 in real time.
 *
 * WHY AN AUDIOWORKLET?
 *   ScriptProcessorNode (the old approach) ran on the main thread and caused
 *   audio glitches whenever the page was busy. AudioWorklet runs on a separate
 *   real-time audio thread and is never blocked by main-thread work.
 *
 * CHUNK SIZE (100ms):
 *   We buffer samples and emit chunks of 100ms (sampleRate × 0.1 samples).
 *   Smaller chunks → more WebSocket messages → more overhead.
 *   Larger chunks → more latency before xAI hears you.
 *   100ms is a good balance for conversational voice.
 *
 * RAW / UNFILTERED:
 *   echoCancellation, noiseSuppression, and autoGainControl are all disabled
 *   in getUserMedia (see ConversationFeed.tsx). Leo hears the raw microphone —
 *   music, ambient sound, instruments — exactly as your mic picks them up.
 *
 * HOW THE DATA FLOWS:
 *   AudioWorklet thread → this.port.postMessage(int16.buffer) → main thread
 *   Main thread receives ArrayBuffer, base64-encodes it, sends via WebSocket
 *   as: { type: "input_audio_buffer.append", audio: "<base64>" }
 *
 * TO ADAPT THIS FOR YOUR OWN APP:
 *   1. Copy this file to your project's public/ directory
 *   2. Register it: await audioCtx.audioWorklet.addModule("audio-processor.js")
 *   3. Create the node: new AudioWorkletNode(audioCtx, "pcm16-processor")
 *   4. Connect your mic source → worklet node → destination
 *   5. Listen on workletNode.port.onmessage for the int16 ArrayBuffers
 */

class PCM16Processor extends AudioWorkletProcessor {
  constructor() {
    super();
    // Accumulate raw float samples here between process() calls
    this._buffer = [];
    // Emit a chunk every 100ms worth of samples (sampleRate is the global 24000)
    this._chunkSamples = Math.floor(sampleRate * 0.1);
  }

  /**
   * process() is called by the audio thread for every render quantum (~128 samples).
   * We must return true to keep the processor alive.
   *
   * inputs[0][0] = Float32Array of mono audio samples, values in [-1.0, 1.0]
   */
  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!channel) return true;

    // Accumulate into our buffer
    for (let i = 0; i < channel.length; i++) {
      this._buffer.push(channel[i]);
    }

    // Emit complete 100ms chunks as they become available
    while (this._buffer.length >= this._chunkSamples) {
      const chunk = this._buffer.splice(0, this._chunkSamples);

      // Convert float32 [-1, 1] → int16 [-32768, 32767]
      // Math.round avoids truncation bias; clamp prevents overflow on hot signals
      const int16 = new Int16Array(chunk.length);
      for (let i = 0; i < chunk.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(chunk[i] * 32767)));
      }

      // Transfer ownership of the buffer to the main thread (zero-copy)
      // The main thread base64-encodes it and sends it to xAI via WebSocket
      this.port.postMessage(int16.buffer, [int16.buffer]);
    }

    return true;
  }
}

registerProcessor("pcm16-processor", PCM16Processor);
