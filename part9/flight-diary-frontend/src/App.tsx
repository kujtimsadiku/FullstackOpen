import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import NewEntry from "./components/NewEntry";
import { DiaryEntry } from "../types";
import diaryService from "./service/diaries";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesFetched = await diaryService.getAll();
      console.log(diariesFetched);
      setDiaries(diariesFetched);
    };

    fetchDiaries();
  }, []);

  return (
    <>
      <ErrorMessage errorMessage={errorMessage} />
      <NewEntry
        setDiaries={setDiaries}
        diaries={diaries}
        setErrorMessage={setErrorMessage}
      />
      <DiaryEntries diaries={diaries} />
    </>
  );
}

export default App;
