import { Visibility, Weather } from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((w) => w.toString())
    .includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Invalid or missing weather");
  }

  return weather;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date);
  }
  return date;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility");
  }

  return visibility;
};

export const parseComment = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing comment");
  }

  return param;
};
