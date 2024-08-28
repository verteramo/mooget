import { AnswerComponent } from '@/components/common/AnswerComponent'
import { Html } from '@/components/common/Html'
import { render } from '@/components/layout/render'
import { useConfigStore, useQuizCollectionStore } from '@/stores'
import { Box, Card, CardContent, List, ListItem, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Solver (): JSX.Element {
  const { t } = useTranslation()

  const printQuizId = useConfigStore((state) => state.printQuizId)
  const quiz = useQuizCollectionStore((state) => state.items.find((item) => item.id === printQuizId))

  if (quiz === undefined) {
    return (
      <div>
        <h1>Quiz Not Found</h1>
      </div>
    )
  }

  return (
    <Stack spacing={1}>
      <Typography variant='h3'>{quiz.name}</Typography>
      {quiz.questions.map((question, questionIndex) => (
        <Card key={question.id} elevation={2}>
          <Box p={2}>
            <Typography
              variant='caption'
              color='text.secondary'
              textTransform='uppercase'
              fontSize={10}
              fontWeight='bold'
            >
              {t('question', { number: questionIndex + 1 })}
            </Typography>
            <Typography align='justify' fontWeight={540}>
              <Html content={question.content} />
            </Typography>
            <CardContent>
              <AnswerComponent
                type={question.type}
                matching={question.answers.map(
                  ({ value, match }, answerIndex) => (
                    <Stack
                      key={`q${questionIndex}-a${answerIndex}`}
                      direction='row'
                      alignContent='center'
                    >
                      {`${value as string} > ${match as string}`}
                    </Stack>
                  )
                )}
                multichoice={
                  <List>
                    {question.answers.map(({ value, match }, answerIndex) => (
                      <ListItem
                        key={`q${questionIndex}-a${answerIndex}`}
                        sx={{
                          margin: 1,
                          backgroundColor: match as boolean ? 'success.light' : 'error.light'
                        }}
                      >
                        <Html content={value as string} />
                      </ListItem>
                    ))}
                  </List>
                }
                text={<div>text</div>}
                truefalse={<div>truefalse</div>}
              />
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  )
}

render(<Solver />)
