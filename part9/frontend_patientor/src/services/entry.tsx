import axios from "axios";
import { Entry, EntryWithoutID } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (object: EntryWithoutID) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/:id/entries`, object);

  return data;
};

export default {
  create,
};
