---
name: Screen share vision
description: How screen sharing is implemented in ConversationFeed — getDisplayMedia into a hidden video, frame capture to /api/grok-vision.
---

## Rule
Screen share uses a **hidden `<video ref={screenVideoRef}>` element** (never shown to user) fed by `getDisplayMedia()`. Frames are captured to the shared `captureCanvasRef` at 1280×720 and POSTed to `/api/grok-vision` with `prompt: "This is a screenshot of the user's screen."`.

**Why:** Reuses the exact same `/api/grok-vision` REST endpoint as camera vision — no server changes needed. Canvas capture is the only cross-browser way to grab a frame from a MediaStream.

**How to apply:**
- `toggleScreen()` calls `getDisplayMedia()`, sets `srcObject` on the hidden video, starts a `setInterval` at `VISION_INTERVAL_MS` (3000ms).
- When the user stops via browser native UI, the track's `"ended"` event fires — always listen for it to clean up state.
- `NotAllowedError` on `getDisplayMedia()` means user dismissed the picker — swallow silently, do not show an error message.
- Screen and camera intervals are independent — both can run simultaneously; Leo gets frames from each.
