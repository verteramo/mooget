/*******************************************************************************
 * QuizStepper.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { ArrowBack, ArrowForward, Done } from "@mui/icons-material";
import { IconButton, MobileStepper } from "@mui/material";

interface Props {
  steps: number;
  current: number;
  onBackClick: () => void;
  onNextClick: () => void;
  onFinished: () => void;
}

export function QuizStepper({
  steps,
  current,
  onBackClick,
  onNextClick,
  onFinished,
}: Props): JSX.Element {
  const isFirstStep = current === 0;
  const isLastStep = current === steps - 1;

  return (
    <MobileStepper
      variant="text"
      position="static"
      steps={steps}
      activeStep={current}
      backButton={
        <IconButton disabled={isFirstStep} onClick={onBackClick}>
          <ArrowBack />
        </IconButton>
      }
      nextButton={
        isLastStep ? (
          <IconButton onClick={onFinished}>
            <Done />
          </IconButton>
        ) : (
          <IconButton onClick={onNextClick}>
            <ArrowForward />
          </IconButton>
        )
      }
    />
  );
}
