/*******************************************************************************
 * Actionbar.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencie
import { t } from "i18next";

import { IconButton, Paper, Stack } from "@mui/material";

import {
  ContentPasteOffRounded,
  ContentPasteRounded,
  UploadFileRounded,
  ViewSidebarRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";

// Project dependencies
import { InputFile } from "@/components/common/InputFile";
import { Quiz } from "@/models";
import { useConfigStore } from "@/stores";
import { loadQuiz } from "@/utilities/quizzes";

interface Props {
  onLoadQuiz: (quiz: Quiz) => void;
}

export function Actionbar({ onLoadQuiz }: Props): JSX.Element {
  const visibility = useConfigStore((state) => state.visibility);
  const clipboard = useConfigStore((state) => state.clipboard);
  const toggleVisibility = useConfigStore((state) => state.toggleVisibility);
  const toggleClipboard = useConfigStore((state) => state.toggleClipboard);

  function handleFileChange([file]: FileList): void {
    loadQuiz(file)
      .then((quiz) => {
        if (quiz !== undefined) {
          onLoadQuiz(quiz);
        }
      })
      .catch(console.error);
  }

  function handleSidePanelClick(): void {
    browser.sidebarAction.open().catch(console.error);
  }

  return (
    <Paper component={Stack} direction="row" flexGrow={1} spacing={1} p={1}>
      <InputFile onChange={handleFileChange} accept=".json">
        <IconButton color="inherit" title={t("upload")}>
          <UploadFileRounded />
        </IconButton>
      </InputFile>

      <IconButton
        color="inherit"
        onClick={handleSidePanelClick}
        title={t("sidepanel")}
      >
        <ViewSidebarRounded />
      </IconButton>

      <IconButton
        color="inherit"
        onClick={toggleVisibility}
        title={t("reveal-answers")}
      >
        {visibility ? <VisibilityRounded /> : <VisibilityOffRounded />}
      </IconButton>

      <IconButton
        color="inherit"
        onClick={toggleClipboard}
        title={t("enable-clipboard")}
      >
        {clipboard ? <ContentPasteRounded /> : <ContentPasteOffRounded />}
      </IconButton>
    </Paper>
  );
}
