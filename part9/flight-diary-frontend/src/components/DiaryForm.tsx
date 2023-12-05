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
    // need to be concat with previous ones. Must pass the values here also to concat it
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
      // easier for use to modified what he has typed
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
          <TextField {...diaryFields.date.inputProps} />
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
            <RadioGroup row {...diaryFields.weather.inputProps}>
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
      </form>
    </div>
  );

  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label htmlFor="date" />
  //           <input
  //             id="date" // add id to others also since label prefers id over the name
  //             name="date"
  //             placeholder="date YYYY-MM-DD"
  //             {...diaryFields.date.inputProps}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="visibility" />
  //           <input
  //             id="visibility"
  //             name="visibility"
  //             placeholder="visibility"
  //             {...diaryFields.visibility.inputProps}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="weather" />
  //           <input
  //             id="weather"
  //             name="weather"
  //             placeholder="weather"
  //             {...diaryFields.weather.inputProps}
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="comment" />
  //           <input
  //             id="comment"
  //             name="comment"
  //             placeholder="comment"
  //             {...diaryFields.comment.inputProps}
  //           />
  //         </div>
  //         <div>
  //           <button type="submit">add</button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }
}

export default DiaryForm;
