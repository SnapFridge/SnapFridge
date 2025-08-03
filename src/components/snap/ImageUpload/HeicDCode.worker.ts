import init from "heic-d-code";

// TODO: Find a way to get rid of TLA warnings
const decoder = await init();
const canvas = new OffscreenCanvas(0, 0);
const ctx = canvas.getContext("2d")!;
postMessage("");
onmessage = async (e) => {
  // We have to do the as typing for some odd reason otherwise ESLint complains!
  const [imageDataArray, width, height] = decoder.decode(e.data as Uint8Array) as [
    Uint8ClampedArray,
    number,
    number,
  ];
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(new ImageData(imageDataArray, width, height), 0, 0);
  const blob = await canvas.convertToBlob();
  postMessage(URL.createObjectURL(blob));
};
