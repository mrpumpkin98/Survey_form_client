import { atom } from "recoil";
import { AnswerTypeItem } from "../components/ShortAnswer";

export const selectedAnswerTypesState = atom<AnswerTypeItem[]>({
  key: "selectedAnswerTypesState",
  default: [],
});

export const selectedAnswerTitleState = atom({
  key: "selectedAnswerTitleState",
  default: "",
});

export const selectedAnswerDescriptionState = atom({
  key: "selectedAnswerDescriptionState",
  default: "",
});

export const previewState = atom({
  key: "previewState",
  default: false,
});
