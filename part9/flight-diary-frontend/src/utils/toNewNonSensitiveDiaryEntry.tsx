import { NewNonSensitiveDiaryEntry } from "../../types";
import { parseWeather, parseDate, parseVisibility } from "./parseUtils";

const toNewNonSensitiveDiaryEntry = (
  object: unknown
): NewNonSensitiveDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in object && "weather" in object && "visibility" in object) {
    const newNonsensitiveEntry: NewNonSensitiveDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
    };

    return newNonsensitiveEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewNonSensitiveDiaryEntry;
