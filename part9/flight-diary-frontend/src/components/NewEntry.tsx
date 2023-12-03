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

/* puts FormFields to "" == null or empty */
function defaultValues(params: DiaryFields): void {
  params.date.onReset();
  params.visibility.onReset();
  params.weather.onReset();
  params.comment.onReset();
}

function NewEntry({
  setDiaries,
  diaries,
  setErrorMessage,
}: {
  setDiaries: SetStateDiaryEntry;
  diaries: DiaryEntry[];
  setErrorMessage: SetStateErrorMessage;
}) {
  const diaryFields: DiaryFields = {
    date: useField("text"),
    visibility: useField("text"),
    weather: useField("text"),
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="p-1 relative">
          <label htmlFor="date" />
          <input
            id="date" // add id to others also since label prefers id over the name
            name="date"
            className="border rounded border-black focus:bg-gray-300 pl-0.5"
            placeholder="date"
            {...diaryFields.date.inputProps}
          />
        </div>
        <div className="p-1 relative">
          <label htmlFor="visibility" />
          <input
            id="visibility"
            name="visibility"
            className="border rounded border-black focus:bg-gray-300 pl-0.5"
            placeholder="visibility"
            {...diaryFields.visibility.inputProps}
          />
        </div>
        <div className="p-1 relative">
          <label htmlFor="weather" />
          <input
            id="weather"
            name="weather"
            className="border rounded border-black focus:bg-gray-300"
            placeholder="weather"
            {...diaryFields.weather.inputProps}
          />
        </div>
        <div className="p-1 relative">
          <label
            className="absolute pl-1 transform -translate-y-3 duration-300"
            htmlFor="comment"
          >
            comment
          </label>
          <input
            id="comment"
            name="comment"
            className="border rounded border-black focus:bg-gray-300 h-auto before:focus:peer-focus:-translate-y-"
            {...diaryFields.comment.inputProps}
          />
        </div>
        <div className="pl-1">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="submit"
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEntry;
