import { NewDiaryEntry } from "../../types";
import {
  parseComment,
  parseDate,
  parseVisibility,
  parseWeather,
} from "./parseUtils";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "weather" in object &&
    "visibility" in object &&
    "comment" in object
  ) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
