import axios from "axios";
import { EntryWithoutID } from "../types";

const create = async (object: EntryWithoutID) => {
  const { data } = await axios.post<>;
};
