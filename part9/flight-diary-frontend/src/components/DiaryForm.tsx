import {
  DiaryEntry,
  NewDiaryEntry,
  SetStateDiaryEntry,
  DiaryFields,
  SetStateErrorMessage,
  Weather,
  Visibility,
} from "../../types";
import diariesService from "../service/diaries";
import { useField } from "../hooks/inputHook";
import toNewDiaryEntry from "../utils/toNewDiaryEntry";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

/* puts FormFields to "" == null or empty */
function defaultValues(params: DiaryFields): void {
  params.date.onReset();
  params.visibility.onReset();
  params.weather.onReset();
  params.comment.onReset();
}

function checkInputs(diaries: DiaryFields): boolean {
  if (
    !diaries.date.value ||
    !diaries.visibility.value ||
    !diaries.weather.value ||
    !diaries.comment.value
  ) {
    return true;
  }

  return false;
}

function DiaryForm({
  setDiaries,
  diaries,
  setErrorMessage,
}: {
  setDiaries: SetStateDiaryEntry;
  diaries: DiaryEntry[];
  setErrorMessage: SetStateErrorMessage;
}) {
  const diaryFields: DiaryFields = {
    date: useField("date"),
    visibility: useField(Visibility.Great),
    weather: useField(Weather.Sunny),
    comment: useField("text"),
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiary: NewDiaryEntry = toNewDiaryEntry({
        date: diaryFields.date.value,
        weather: diaryFields.weather.value as Weather,
        visibility: diaryFields.visibility.value as Visibility,
        comment: diaryFields.comment.value,
      });

      await diariesService
        .createDiary(newDiary)
        .then((data) => setDiaries(diaries.concat(data)));

      // set to default only when it has successfully added
      // easier for use to modified what user has typed
      defaultValues(diaryFields);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";

      if (error instanceof Error) {
        errorMessage = "" + error;
        setErrorMessage(errorMessage);
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Date</InputLabel>
          <TextField name="Date" {...diaryFields.date.inputProps} />
        </div>
        <div>
          <FormControl>
            <FormLabel>Visibility</FormLabel>
            <RadioGroup
              row
              name="Visibility"
              {...diaryFields.visibility.inputProps}
            >
              {Object.values(Visibility).map((v, i) => (
                <FormControlLabel
                  key={i}
                  control={<Radio />}
                  value={v}
                  label={v}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel>Weather</FormLabel>
            <RadioGroup row name="Weather" {...diaryFields.weather.inputProps}>
              {Object.values(Weather).map((w, i) => (
                <FormControlLabel
                  key={i}
                  control={<Radio />}
                  label={w}
                  value={w}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <InputLabel>Comment</InputLabel>
          <TextField
            fullWidth
            name="Comment"
            {...diaryFields.comment.inputProps}
          />
        </div>

        <Button
          style={{ marginTop: 25 }}
          color="primary"
          type="submit"
          variant="contained"
          disabled={checkInputs(diaryFields)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default DiaryForm;
