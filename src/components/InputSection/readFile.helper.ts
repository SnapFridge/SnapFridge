function readFile(file: File): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string | undefined);
    };
    reader.onerror = () => {
      reject(Error("Error reading file"));
    };
    reader.onabort = () => {
      reject(Error("Error, operation aborted"));
    };
    reader.readAsDataURL(file);
  });
}

export default readFile;