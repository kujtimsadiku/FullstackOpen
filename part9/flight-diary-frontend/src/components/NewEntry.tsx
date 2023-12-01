import {
  DiaryEntry,
  NewDiaryEntry,
  SetStateDiaryEntry,
  FormField,
  NewNonSensitiveDiaryEntry,
} from "../../types";
import diariesService from "../service/diaries";
import { useField } from "../hooks/inputHook";
import toNewNonSensitiveDiaryEntry from "../utils/toNewNonSensitiveDiaryEntry";
import toNewDiaryEntry from "../utils/toNewDiaryEntry";

function NewEntry({
  setDiaries,
  diaries,
}: {
  setDiaries: SetStateDiaryEntry;
  diaries: DiaryEntry[];
}) {
  const comment = useField("text");
  const weather = useField("text");
  const visibility = useField("text");
  const date = useField("text");

  function defaultValues({ params }: { params: FormField[] }): void {
    Object.values(params).map((reset) => {
      reset.onReset();
    });
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // need to be concat with previous ones. Must pass the values here also to concat it

    let newDiary: NewDiaryEntry | NewNonSensitiveDiaryEntry;

    if (!comment || comment.value) {
      newDiary = toNewNonSensitiveDiaryEntry({
        date: date.value,
        weather: weather.value,
        visibility: visibility.value,
      });
    } else {
      newDiary = toNewDiaryEntry({
        date: date.value,
        weather: weather.value,
        visibility: visibility.value,
        comment: comment.value,
      });
    }

    try {
      const data = await diariesService
        .createDiary(newDiary)
        .then((data) => setDiaries(diaries.concat(data)));

      console.log(data);
    } catch (error) {
      let message = "Something went wrong.";
      if (error instanceof Error) {
        message += " Error: " + error;
      }
      console.log(message);
    }
    const params: FormField[] = [date, weather, visibility, comment];
    defaultValues({ params });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="p-1">
          <label className="pr-2" htmlFor="date">
            date
          </label>
          <input
            id="date" // add id to others also since label prefers id over the name
            name="date"
            className="border rounded border-black focus:bg-gray-300"
            {...date.inputProps}
          />
        </div>
        <div className="p-1">
          <label className="pr-2" htmlFor="visibility">
            visibility
          </label>
          <input
            id="visibility"
            name="visibility"
            className="border rounded border-black focus:bg-gray-300"
            {...visibility.inputProps}
          />
        </div>
        <div className="p-1">
          <label className="pr-2" htmlFor="weather">
            weather
          </label>
          <input
            id="weather"
            name="weather"
            className="border rounded border-black focus:bg-gray-300"
            {...weather.inputProps}
          />
        </div>
        <div className="p-1">
          <label className="pr-2 " htmlFor="comment">
            comment
          </label>
          <input
            id="comment"
            name="comment"
            className="border rounded border-black focus:bg-gray-300"
            {...comment.inputProps}
          />
        </div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          add
        </button>
      </form>
    </div>
  );
}

export default NewEntry;
