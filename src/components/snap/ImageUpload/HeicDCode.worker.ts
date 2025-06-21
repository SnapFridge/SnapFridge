import init from "heic-d-code";
const decoder = await init();
const canvas = new OffscreenCanvas(0, 0);
const ctx = canvas.getContext("2d")!;
onmessage = async e => {
  const { data, width, height } = decoder.decode(e.data);
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  const blob = await canvas.convertToBlob();
  postMessage(URL.createObjectURL(blob));
}