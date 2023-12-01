import React from "react";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface FormField {
  value: string;
  inputProps: {
    inputType: string;
    value: string;
    onChange: (event: ChangeEvent) => void;
  };
  onReset: () => void;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type SetStateDiaryEntry = React.Dispatch<
  React.SetStateAction<DiaryEntry[]>
>;
