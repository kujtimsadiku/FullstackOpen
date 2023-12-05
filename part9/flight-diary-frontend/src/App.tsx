import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "../types";
import diaryService from "./service/diaries";
import ErrorMessage from "./components/ErrorMessage";
import DiaryForm from "./components/DiaryForm";

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
    <div className="app__app_container">
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <DiaryForm
        setDiaries={setDiaries}
        diaries={diaries}
        setErrorMessage={setErrorMessage}
      />
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
