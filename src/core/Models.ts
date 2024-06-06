
export interface IQuestion {
  html: string | null
}

export interface ITest {
  title: string
  questions: IQuestion[]
}

export class Test {
  private $: cheerio.Root

  constructor($: cheerio.Root) {
    this.$ = $
  }

  get title(): string {
    return this.$('.breadcrumb-item:last').text()
  }

  *questions(): Iterable<IQuestion> { 
    for (const question of this.$('.que')) {
      yield { html: this.$(question).find('.qtext').html() }
    }
  }

  getITest(): ITest {
    return {
      title: this.title,
      questions: [...this.questions()]
    }
  }
}
