// Helper functions to convert raw PCM audio data from the Gemini API 
// into a WAV Data URL suitable for playback in a browser <audio> element.

/**
 * Writes a string to a DataView at a specific offset.
 * @param view The DataView to write to.
 * @param offset The offset to start writing at.
 * @param string The string to write.
 */
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

/**
 * Converts a base64 encoded string of raw PCM audio data into a base64 encoded WAV Data URL.
 * @param base64Pcm The base64 string of raw PCM audio data.
 * @returns A Data URL string that can be used as the `src` for an HTMLAudioElement.
 */
export const pcmToWavDataUrl = (base64Pcm: string): string => {
  const binaryString = atob(base64Pcm);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const pcmData = bytes.buffer;

  // Standard WAV header properties for Gemini TTS output
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  
  const dataSize = pcmData.byteLength;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // 1 = PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  const pcmBytes = new Uint8Array(pcmData);
  const wavBytes = new Uint8Array(buffer);
  wavBytes.set(pcmBytes, 44);
  
  let binary = '';
  for (let i = 0; i < wavBytes.byteLength; i++) {
    binary += String.fromCharCode(wavBytes[i]);
  }
  const wavBase64 = btoa(binary);

  return `data:audio/wav;base64,${wavBase64}`;
}
