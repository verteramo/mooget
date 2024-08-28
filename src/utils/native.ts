/*******************************************************************************
 * native.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Get an object without null/undefined values,
 * applying a weak null check on every property
 *
 * @param object Object
 * @returns Partial object
 */
export function partial<T> (object: { [key: string]: any }): Partial<T> {
  return Object.entries(object).reduce<Partial<T>>(
    (object, [property, value]) =>
      value == null ? object : { ...object, [property]: value }
    , {})
}

/**
 * Shuffle array; makes a copy
 *
 * @param array Array
 * @returns Shuffled array
 */
export function shuffle<T> (array: T[]): T[] {
  const copy = [...array]

  for (let current = copy.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1));
    [copy[current], copy[random]] = [copy[random], copy[current]]
  }

  return copy
}

/**
 * Convert a string to title case;
 * example: 'hello world' -> 'Hello World'
 *
 * @param str String
 * @returns Title case string
 */
export function toTitleCase (str: string): string {
  return str
    .split(' ')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(' ')
}

/**
 * Open the side panel
 */
export async function openSidePanel (): Promise<void> {
  if ((browser as any).sidePanel === undefined) {
    // It's Firefox
    await browser.sidebarAction.open()
  } else {
    // It's Chromium
    const windowId = (await browser.windows.getCurrent()).id

    if (windowId !== undefined) {
      (browser as any).sidePanel.open({ windowId })
    }
  }
}

export function isUserScriptsAvailable (): boolean {
  try {
    browser.userScripts.register({
      js: [{ code: 'console.log("Hello, world!")' }],
      matches: ['*://*/*']
    })
    return true
  } catch {
    return false
  }
}

export async function openNewTab (url: string): Promise<void> {
  await browser.tabs.create({ url })
}
