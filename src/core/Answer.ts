import * as cheerio from 'cheerio';
import Choice from './Choice';

export default class Answer {
    private root: cheerio.Cheerio

    constructor(root: cheerio.Cheerio) {
        this.root = root;
    }
    
    *choices(): Iterable<Choice> {
        for(const choiceElement of this.root.children()) {
            yield new Choice(choiceElement);
        }
    }
}
