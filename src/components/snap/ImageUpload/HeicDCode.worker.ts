import init from "heic-d-code";

// TODO: Find a way to get rid of TLA warnings
const decoder = await init();
const canvas = new OffscreenCanvas(0, 0);
const ctx = canvas.getContext("2d")!;
postMessage("");
onmessage = async (e) => {
  const out = decoder.decode(e.data as Uint8Array);
  canvas.width = out[1];
  canvas.height = out[2];
  ctx.putImageData(new ImageData(...out), 0, 0);
  const blob = await canvas.convertToBlob();
  postMessage(URL.createObjectURL(blob));
};
