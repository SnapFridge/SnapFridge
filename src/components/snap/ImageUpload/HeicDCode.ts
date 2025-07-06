function heic2URL(worker: Worker, heicData: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    const onErr = (e: ErrorEvent) => {
      reject(e.error);
    };
    worker.addEventListener(
      "message",
      (e) => {
        worker.removeEventListener("error", onErr);
        resolve(e.data as string);
      },
      { once: true }
    );
    worker.addEventListener("error", onErr, { once: true });
    worker.postMessage(heicData, [heicData.buffer]);
  });
}
export default heic2URL;
