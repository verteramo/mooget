
/**
 * Fetch version from URL
 * @param url Site URL
 * @returns Version
 */
export async function fetchVersion (url: string): Promise<string> {
  return ((await (
    await fetch(`${url}/lib/upgrade.txt`)
  ).text()
  ).match(/\d+\.\d+\.\d+/g) as string[]).shift() as string
}

/**
 * Fetch image from URL
 * @param src Image URL
 * @returns Base64 image
 */
export async function fetchImage (src: string): Promise<string> {
  const blob = await (await fetch(src)).blob()
  const reader = new FileReader()

  return await new Promise((resolve, reject) => {
    reader.onload = () => {
      const [, base64] = (reader.result as string).split(',')
      resolve(`data:${blob.type};base64,${base64}`)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
