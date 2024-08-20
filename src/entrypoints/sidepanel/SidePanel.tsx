/*******************************************************************************
 *SidePanel.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

 // External dependencies
import { Close } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from "react-i18next";

import {
  Divider, 
  IconButton, 
  Paper, 
  Stack, 
  Typography 
} from "@mui/material";

// Package dependencies
import { MatchingAnswer } from "./components/MatchingAnswer";
import { MultichoiceAnswer } from "./components/MultichoiceAnswer";
import { QuestionAnswer } from "./components/QuestionAnswer";
import { QuizStepper } from "./components/QuizStepper";
import { TextAnswer } from "./components/TextAnswer";
import { TrueFalseAnswer } from "./components/TrueFalseAnswer";

// Project dependencies
import { DashedBox } from "@/components/common/DashedBox";
import { Html } from "@/components/common/Html";
import { render } from "@/components/layout/render";
import { useProgressStore, useQuizCollectionStore } from "@/stores";

function SidePanel(): JSX.Element {
  const { t } = useTranslation();

  const confirm = useConfirm();

  const quizId = useProgressStore(({ quizId }) => quizId);
  const step = useProgressStore(({ step }) => step);
  const answers = useProgressStore(({ answers }) => answers);
  const setQuiz = useProgressStore(({ setQuiz }) => setQuiz);
  const setStep = useProgressStore(({ setStep }) => setStep);
  const setAnswer = useProgressStore(({ setAnswer }) => setAnswer);
  const answer = answers[step];
  const quiz = useQuizCollectionStore(({ items }) =>
    items.find(({ id }) => id === quizId)
  );

  if (quiz === undefined) {
    return <DashedBox>{t("empty-quiz")}</DashedBox>;
  }

  const question = quiz.questions[answer.index];

  const isSinglechoice =
    question.answers?.filter(({ match }) => match === true).length === 1;

  const choices = question.answers?.map(({ value }) => value) as string[];

  const handleCloseClick = (): void => {
    confirm({
      title: t("close"),
      description: quiz.name,
      confirmationText: t("accept"),
      cancellationText: t("cancel"),
    })
      .then(() => setQuiz(""))
      .catch(console.error);
  };

  const handleBackClick = (): void => {
    setStep(step - 1);
  };

  const handleNextClick = (): void => {
    setStep(step + 1);
  };

  const handleFinished = (): void => {
    console.log("finished");
  };

  const handleTextAnswerChange = (value: string): void => {
    setAnswer({ ...answer, answer: [value] });
  };

  const handleMultichoiceAnswerChange = (value: boolean[]): void => {
    setAnswer({ ...answer, answer: value });
  };

  return (
    <Paper elevation={2}>
      <Stack divider={<Divider variant="middle" />}>
        <Stack direction="row" p={2}>
          <Typography variant="h6" flexGrow={1}>
            {quiz.name}
          </Typography>
          <IconButton title={t("close")} onClick={handleCloseClick}>
            <Close />
          </IconButton>
        </Stack>
        <Stack p={2} spacing={2}>
          <QuizStepper
            steps={quiz.questions.length}
            current={step}
            onFinished={handleFinished}
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
          />
          <Typography align="justify">
            <Html content={question.content} />
          </Typography>
          <QuestionAnswer
            type={question.type}
            text={
              <TextAnswer
                value={answer.answer?.[0] as string}
                onChange={handleTextAnswerChange}
              />
            }
            multichoice={
              <MultichoiceAnswer
                single={isSinglechoice}
                choices={choices.map((content, index) => ({
                  content,
                  checked: answer.answer?.[index] as boolean,
                }))}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            truefalse={
              <TrueFalseAnswer
                value={answer.answer?.[0] as boolean | undefined}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            matching={
              <MatchingAnswer
                choices={choices.map((content, index) => ({
                  value: content,
                  correct: question.answers?.[index].match as string,
                }))}
              />
            }
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

render(<SidePanel />);
