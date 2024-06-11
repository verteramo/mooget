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

function getElementCssSelector(element: cheerio.Cheerio) {
  if (element.attr('id')) {
    return `#${element.attr('id')}`
  }
  else {
    var tagName = element.get(0).tagName;

    if (tagName === 'body') {
      return tagName;
    }

    if (element.siblings().length === 0) {
      return element.get(0).tagName;
    }

    if (element.index() === 0) {
      return element.get(0).tagName + ':first-child';
    }

    if (element.index() === element.siblings().length) {
      return `${element.get(0).tagName}:last-child`
    }

    return `${element.get(0).tagName}:nth-child(${element.index() + 1})`;
  }
}

export function getCssSelector($: cheerio.Root, el: cheerio.Element): string {
  const element = $(el);
  var parents = element.parents();

  // Element doesn't have any parents
  if (!parents[0]) {
    return ':root';
  }

  var cssSelector = getElementCssSelector(element);

  if (cssSelector[0] === '#' || cssSelector === 'body') {
    return cssSelector;
  }

  var i = 0;
  var elementCssSelector;

  do {
    // Stop before we reach the html element parent
    elementCssSelector = getElementCssSelector($(parents[i]));
    cssSelector = elementCssSelector + ' > ' + cssSelector;
    i++;
  } while (i < parents.length - 1 && elementCssSelector[0] !== '#');

  return cssSelector;
};
