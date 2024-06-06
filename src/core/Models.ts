export interface IQuestion {
  text: string
  images: string[]
  answer: any[]
}

export interface ITest {
  title: string
  questions: IQuestion[]
}

export class Question {
  private $: cheerio.Cheerio

  constructor($: cheerio.Cheerio) {
    this.$ = $
  }

  get text(): string {
    return this.$('.qtext').text()
  }

  get images(): string[] {
    return [...this.$('.qtext img').map((_, element) => this.$(element).attr('src'))]
  }

  get answer(): any[] {
    return [...this.$('.answer').map((_, element) => this.$(element).text())]
  }
}

export class Test {
  private $: cheerio.Root

  constructor($: cheerio.Root) {
    this.$ = $
  }

  get title(): string {
    return this.$('.breadcrumb-item:last').text()
  }

  *questions() {
    for (const element of this.$('.que')) {
      yield new Question(this.$(element))
    }
  }

  getITest(): ITest {
    return {
      title: this.title,
      questions: [...this.questions()].map((question) => {
        return {
          text: question.text,
          images: question.images,
          answer: question.answer,
        }
      })
    }
  }
}
