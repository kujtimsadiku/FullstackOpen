import axios from "axios";
import { Entry, EntryWithoutID } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (ID: string, object: EntryWithoutID) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${ID}/entries`,
    object
  );

  return data;
};

export default {
  create,
};
