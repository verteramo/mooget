/*******************************************************************************
 * TextAnswer.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function TextAnswer({ value, onChange }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <TextField
      fullWidth
      multiline
      label={t("answer")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
