import * as cheerio from 'cheerio';
import Test from '../core/Test';
import Question from '../core/Question';

const $ = cheerio.load(document.body.innerHTML);

var test: Test = new Test($);

console.log("Initializing test...");
console.log(test.title);

for (const question of test.questions()) {
    console.log(question.text);
}
