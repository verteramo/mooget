/**
 * Utils
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

/**
 * Message subjects
 */
export enum Subject {
  SetBadge,
  GetContext,
  GetVersion,
  ConvertImage,
}

/**
 * Get the site version
 * @param url Site URL
 * @returns Site version
 */
export const getSiteVersion =
  async (url: string): Promise<string> => ((
    await (
      await fetch(`${url}/lib/upgrade.txt`)
    ).text()
  ).match(/\d+\.\d+\.\d+/g) as string[]).shift() as string

/**
 * Convert image to base64
 * @param src Image link
 * @returns Image as base64
 */
export const convertImageToBase64 =
  async (src: string): Promise<string> => {
    const blob = await (await fetch(src)).blob()
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const [, base64] = (reader.result as string).split(',')
        resolve(`data:${blob.type};base64,${base64}`)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
