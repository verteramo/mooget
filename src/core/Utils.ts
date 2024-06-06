export async function toBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const mimeType = blob.type;

    // Read the Blob as a Base64 string
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const [_, base64] = (reader.result as string).split(',');
        console.log(`data:${mimeType};base64,${base64}`)
        resolve(`data:${mimeType};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error converting image at ${url} to Base64:`, error);
    throw error;
  }
}
