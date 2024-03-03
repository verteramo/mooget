import * as cheerio from "cheerio";
import Question from "./Question";

export default class Test {
    private root: cheerio.Root

    constructor(root: cheerio.Root) {
        this.root = root;
    }

    get title(): string {
        return this.root('.breadcrumb-item:last').text();
    }

    *questions(): Iterable<Question> {
        for(const question of this.root('.que')) {
            yield new Question(cheerio.load(question));
        }
    }
}
