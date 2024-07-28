/**
 * fetchImageAsBase64.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

/**
 * Fetch image as base64
 *
 * @param src Image source URL
 * @returns Base64 image or undefined if failed
 */
export async function fetchImageAsBase64 (src: string): Promise<string | undefined> {
  const response = await fetch(src)

  if (response.ok) {
    const blob = await response.blob()
    const reader = new FileReader()

    return await new Promise((resolve, reject) => {
      reader.onload = function () {
        const base64 = (this.result as string).split(',')?.[1]

        if (base64 !== undefined) {
          resolve(`data:${blob.type};base64,${base64}`)
        } else {
          reject(new Error('Failed to read image'))
        }
      }

      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}
