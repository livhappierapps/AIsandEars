class PCM16Processor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buffer = [];
    this._chunkSamples = Math.floor(sampleRate * 0.1);
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!channel) return true;

    for (let i = 0; i < channel.length; i++) {
      this._buffer.push(channel[i]);
    }

    while (this._buffer.length >= this._chunkSamples) {
      const chunk = this._buffer.splice(0, this._chunkSamples);
      const int16 = new Int16Array(chunk.length);
      for (let i = 0; i < chunk.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(chunk[i] * 32767)));
      }
      this.port.postMessage(int16.buffer, [int16.buffer]);
    }

    return true;
  }
}

registerProcessor("pcm16-processor", PCM16Processor);
