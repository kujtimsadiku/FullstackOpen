import axios from "axios";
import { apiBaseUrl } from "../../constant";
import { DiaryEntry, NewDiaryEntry } from "../../types";

const getAll = () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then((res) => res.data);
};

const createDiary = (obj: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${apiBaseUrl}/diaries`, obj)
    .then((res) => res.data);
};

export default {
  getAll,
  createDiary,
};
