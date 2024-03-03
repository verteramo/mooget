import * as cheerio from 'cheerio';

export default class Choice {
    private element: cheerio.Element

    constructor(element: cheerio.Element) {
        this.element = element;
    }

    get text() {
        return this.element
    }
}