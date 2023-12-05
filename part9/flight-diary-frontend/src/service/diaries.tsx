import axios from "axios";
import { apiBaseUrl } from "../../constant";
import { DiaryEntry, NewDiaryEntry } from "../../types";

const getAll = async () => {
  const res = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return res.data;
};

const createDiary = async (obj: NewDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, obj);
  return res.data;
};

export default {
  getAll,
  createDiary,
};
