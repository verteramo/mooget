export default class Question {
    private root: cheerio.Root

    constructor(root: cheerio.Root) {
        this.root = root;
    }

    get text(): string {
        return this.root('.qtext').text();
    }
}