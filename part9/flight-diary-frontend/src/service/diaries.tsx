import axios from "axios";
import { apiBaseUrl } from "../../constant";
import {
  DiaryEntry,
  NewDiaryEntry,
  NewNonSensitiveDiaryEntry,
} from "../../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

  console.log("Fetching data", data);

  return data;
};

const createDiary = async (obj: NewDiaryEntry | NewNonSensitiveDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, obj);

  console.log("Creating new diary", data);

  return data;
};

export default {
  getAll,
  createDiary,
};
