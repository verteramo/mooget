/*******************************************************************************
 * images.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

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

    return await new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onerror = function () {
        reject(this.error)
      }

      reader.onload = function () {
        if (typeof this.result === 'string') {
          const base64 = this.result.split(',')[1]

          if (base64 !== undefined) {
            resolve(`data:${blob.type};base64,${base64}`)
          }
        }
      }

      reader.readAsDataURL(blob)
    })
  }
}
