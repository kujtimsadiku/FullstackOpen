import { DiaryEntry } from "../../types";
import Diary from "./Diary";

function DiaryEntries({ diaries }: { diaries: DiaryEntry[] }) {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <Diary diary={diary} key={diary.id} />
      ))}
    </div>
  );
}

export default DiaryEntries;
