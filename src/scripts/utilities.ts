/**
 * Scripts utilities
 *
 * Like fetching Moodle version, images as base64, etc.
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { ITest } from '@/dom'
import saveAs from 'file-saver'

/**
 * Fetch Moodle version
 *
 * @param url URL
 * @returns Moodle version
 * @link https://stackoverflow.com/questions/11548150/getting-moodle-version-info-no-admin-access
 * @link https://docs.metasploit.com/api/Msf/Exploit/Remote/HTTP/Moodle/Version.html
 */
export async function fetchVersion (url: string): Promise<string | undefined> {
  const response = await fetch(`${url}/lib/upgrade.txt`)
  if (response.ok) {
    const text = await response.text()
    // === x.y... ===
    return text.match(/(?<====\s)\d+\.\d+(?:\.\d+)*(?=\s===)/)?.[0]
  }
}

/**
 * Fetch image as base64
 *
 * @param src Image source
 * @returns Base64 image
 */
export async function fetchImage (src: string): Promise<string> {
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
 *
 * @param element Element
 * @returns HTML with replaced images as base64
 */
export async function replaceImages (element: JQuery<HTMLElement>): Promise<JQuery<HTMLElement>> {
  console.log('replaceImages')
  for (const img of element.find('img')) {
    if (img.src.startsWith('http')) {
      img.src = await fetchImage(img.src)
    }
  }

  return element
}

/**
 * Download test as JSON
 *
 * @param test Test
 */
export function downloadTest (test: ITest): void {
  saveAs(new Blob([JSON.stringify(test)], {
    type: 'application/json'
  }), `${test.name}.json`)
}

/**
 * Shuffle array
 *
 * @param array Array
 * @returns Shuffled array
 */
export function shuffle<T> (array: T[]): T[] {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}
