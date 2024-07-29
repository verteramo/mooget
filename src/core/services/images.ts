/*******************************************************************************
 * images.ts
 *
 * @license GPL-3.0-or-later
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

      reader.onload = function () {
        const base64 = (this.result as string).split(',')?.[1]

        if (base64 !== undefined) {
          resolve(`data:${blob.type};base64,${base64}`)
        }
      }

      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}

/**
 * Replace images src with base64 in JQuery HTML element
 *
 * @param element JQuery HTML element
 * @returns Same JQuery HTML element with images as base64
 */
export async function fetchImagesAsBase64 (
  element: JQuery<HTMLElement> | JQuery<JQuery.Node[]>
): Promise<JQuery<HTMLElement> | JQuery<JQuery.Node[]>> {
  for (const img of element.find('img')) {
    if (img.src.startsWith('http')) {
      const base64Image = await fetchImageAsBase64(img.src)

      if (base64Image !== undefined) {
        img.src = base64Image
      }
    }
  }

  return element
}
