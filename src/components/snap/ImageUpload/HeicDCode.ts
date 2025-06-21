
const worker = new Worker(new URL("HeicDCode.worker.ts", import.meta.url), 
  { type: "module" });

function heic2URL(heicData: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    worker.addEventListener("message", e => {
      resolve(e.data);
    }, { once: true });
    worker.addEventListener("error", e => {
      reject(e.error);
    }, { once: true });
    worker.postMessage(heicData, [heicData.buffer]);
  });
}
export default heic2URL;