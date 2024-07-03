const UpgradeEndpoint = 'lib/upgrade.txt'

/**
 * Fetch Moodle version
 * @param url URL
 * @returns Moodle version
 */
export async function fetchVersion (url: string): Promise<string> {
  const response = await fetch(`${url}/${UpgradeEndpoint}`)
  const text = await response.text()
  const matches = text.match(/\d+\.\d+\.\d+/g)
  return matches?.shift() as string
}

/**
 * Fetch image as base64
 * @param src Image source
 * @returns Base64 image
 */
async function fetchImage (src: string): Promise<string> {
  const blob = await (await fetch(src)).blob()
  const reader = new FileReader()

  return await new Promise((resolve, reject) => {
    reader.onload = () => {
      const parts = (reader.result as string).split(',')
      if (parts.length > 1) {
        const base64 = parts[1]
        resolve(`data:${blob.type};base64,${base64}`)
      } else {
        reject(new Error('Failed to read image'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Replace images in HTML
 * @param element Element
 * @returns HTML with replaced images as base64
 */
export async function replaceImages (element: JQuery<HTMLElement>): Promise<string> {
  let html = element.html()

  for (const img of element.find('img')) {
    html = html.replace(img.src, await fetchImage(img.src))
  }

  return html
}
