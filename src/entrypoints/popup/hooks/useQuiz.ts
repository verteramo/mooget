import { Quiz } from '@/models'

export const useQuiz = (hash: (str: string) => string): [
  Quiz | undefined,
  (quiz: Quiz) => void,
  (name: string) => void,
  (category: string) => void,
] => {
  const [quiz, setQuiz] = useState<Quiz>()

  const setName = (name: string): void => {
    if (quiz !== undefined) {
      setQuiz({
        ...quiz,
        name,
        id: hash(name + quiz.category)
      })
    }
  }

  const setCategory = (category: string): void => {
    if (quiz !== undefined) {
      setQuiz({
        ...quiz,
        category,
        id: hash(quiz.name + category)
      })
    }
  }

  return [quiz, setQuiz, setName, setCategory]
}
