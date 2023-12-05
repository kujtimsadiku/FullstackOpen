import { DiaryEntry } from "../../types";
import Diary from "./Diary";

function DiaryEntries({ diaries }: { diaries: DiaryEntry[] }) {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div className="m-2" key={diary.id}>
          <Diary diary={diary} />
        </div>
      ))}
    </div>
  );
}

export default DiaryEntries;
