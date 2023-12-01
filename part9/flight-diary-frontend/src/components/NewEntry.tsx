import { useState } from "react";
import {
  DiaryEntry,
  NewDiaryEntry,
  SetStateDiaryEntry,
  FormField,
} from "../../types";
import diariesService from "../service/diaries";
import { useField } from "../hooks/inputHook";

function NewEntry({
  setDiaries,
  diaries,
}: {
  setDiaries: SetStateDiaryEntry;
  diaries: DiaryEntry[];
}) {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
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

    await diariesService
      .createDiary(newDiary)
      .then((data) => setDiaries(diaries.concat(data)))
      .catch((error) => console.log(error));

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
