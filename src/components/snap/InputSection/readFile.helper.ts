function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      // I can see the FileReader ^^^ it won't be null`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resolve(event.target!.result as string);
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