import { atomWithStorage } from "jotai/utils";
import { PasswordValidations } from "../types";

const initialState = {
  [PasswordValidations.DIGIT]: false,
  [PasswordValidations.UPPERCASE]: false,
  [PasswordValidations.LOWERCASE]: false,
  [PasswordValidations.SPECIAL_CHARACTER]: false,
  [PasswordValidations.AT_LEAST_8_DIGITS]: false,
  [PasswordValidations.MORE_THAN_10_DIGITS]: false,
};

export const settingsAtom = atomWithStorage("settings", initialState);
