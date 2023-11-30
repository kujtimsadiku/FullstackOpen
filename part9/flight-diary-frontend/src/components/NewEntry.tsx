import { useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "../../types";
import diariesService from "../service/diaries";

function NewEntry({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // need to be concat with previous ones. Must pass the values here also to concat it
    diariesService.createDiary(newDiary).then((data) => setDiaries(data));
  };

  const handleChange = () => {};

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            value={newDiary.date}
            onChange={handleChange}
            name="date"
          />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input
            value={newDiary.visibility}
            onChange={handleChange}
            name="visibility"
          />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input
            value={newDiary.weather}
            onChange={handleChange}
            name="weather"
          />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            value={newDiary?.comment}
            onChange={handleChange}
            name="comment"
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default NewEntry;
