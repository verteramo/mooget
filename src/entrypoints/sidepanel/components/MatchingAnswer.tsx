/*******************************************************************************
  MatchingAnswer.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  choices: Array<{
    value: string;
    correct: string;
  }>;

  onChange?: (value: string[]) => void;
}

export function MatchingAnswer({ choices, onChange }: Props): JSX.Element {
  const { t } = useTranslation();

  const emptyOption = <em>{t("none")}</em>;

  const options = (
    <FormControl fullWidth>
      <Select>
        <MenuItem key={-1} value="">
          {emptyOption}
        </MenuItem>
        {choices
          .map(({ correct }) => correct)
          .map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );

  return (
    <>
      {choices.map(({ value }, index) => {
        return (
          <Grid container rowSpacing={1} key={index} alignItems="center">
            <Grid item xs={4}>
              {value}
            </Grid>
            <Grid item xs={8}>
              {options}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
