import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import NewEntry from "./components/NewEntry";
import { DiaryEntry } from "../types";
import diaryService from "./service/diaries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesFetched = await diaryService.getAll();
      console.log(diariesFetched);
      setDiaries(diariesFetched);
    };

    void fetchDiaries();
  }, []);

  return (
    <>
      <NewEntry setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </>
  );
}

export default App;
