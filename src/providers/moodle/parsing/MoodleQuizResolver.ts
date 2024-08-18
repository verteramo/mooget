import { Question } from '@/core/models'
import { QuizResolver } from '@/core/parsing'

export class MoodleQuizResolver extends QuizResolver {
  resolve (questions: Question[]): void {
    for (const element of document.querySelectorAll('div.que')) {
      element.remove()
    }
  }
}
