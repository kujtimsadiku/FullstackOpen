import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "../types";
import diaryService from "./service/diaries";
import ErrorMessage from "./components/ErrorMessage";
import DiaryForm from "./components/DiaryForm";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const diariesFetched = await diaryService.getAll();
        console.log(diariesFetched);
        setDiaries(diariesFetched);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (
            error?.response?.data &&
            typeof error?.response?.data === "string"
          ) {
            const message = error.response.data.replace(
              "Something went wrong while fetching. Error: ",
              ""
            );
            console.error(message);
            setErrorMessage(message);
          } else {
            setErrorMessage("Unrecognized axios error while fetching");
          }
        } else {
          console.error("Unkown error", error);
          setErrorMessage("Unkown error");
        }
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 2500);
    };

    fetchDiaries();
  }, []);

  return (
    <div>
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
