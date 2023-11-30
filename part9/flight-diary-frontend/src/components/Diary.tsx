import { DiaryEntry } from "../../types";

function Diary({ diary }: { diary: DiaryEntry }) {
  if (!diary) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold font-sans">{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
}

export default Diary;
