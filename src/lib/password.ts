import { PasswordStrength, PasswordValidations } from "./types";

export const getActiveValidations = (options: { [x: string]: boolean }) => {
  return Object.keys(options).filter((v) => !!options[v]);
};

export const passwordStrengthProps = {
  [PasswordStrength.EASY]: {
    value: 33,
    bgColor: "bg-red-600",
    conditions: [],
  },
  [PasswordStrength.MEDIUM]: {
    value: 66,
    bgColor: "bg-amber-600",
    conditions: [
      PasswordValidations.UPPERCASE,
      PasswordValidations.LOWERCASE,
      PasswordValidations.SPECIAL_CHARACTER,
    ],
  },
  [PasswordStrength.HARD]: {
    value: 100,
    bgColor: "bg-green-600",
    conditions: [
      PasswordValidations.DIGIT,
      PasswordValidations.UPPERCASE,
      PasswordValidations.LOWERCASE,
      PasswordValidations.SPECIAL_CHARACTER,
      PasswordValidations.MORE_THAN_10_DIGITS,
    ],
  },
};

export const passwordValidators = {
  [PasswordValidations.DIGIT]: {
    desc: "At least 1 figure",
    fn: (v: string) => /\d/.test(v),
  },
  [PasswordValidations.UPPERCASE]: {
    desc: "At least 1 uppercase",
    fn: (v: string) => /[A-Z]/.test(v),
  },
  [PasswordValidations.LOWERCASE]: {
    desc: "At least 1 lowercase",
    fn: (v: string) => /[a-z]/.test(v),
  },
  [PasswordValidations.AT_LEAST_8_DIGITS]: {
    fn: (v: string) => v.length >= 8,
    desc: "At least 8 characters long",
  },
  [PasswordValidations.MORE_THAN_10_DIGITS]: {
    desc: "",
    fn: (v: string) => v.length > 10,
  },
  [PasswordValidations.SPECIAL_CHARACTER]: {
    fn: (v: string) => /[!@#$%^&*()]/.test(v),
    desc: "At least 1 special character - !@#$%^&*()",
  },
};

export const validatePassword = (
  password: string,
  validations: PasswordValidations[]
) => {
  let isValid = true;
  const list: { [x: string]: boolean } = {};

  validations.forEach((v) => {
    const fn = passwordValidators[v].fn;
    const testSuccess = fn(password);
    if (!testSuccess) isValid = false;
    list[v] = testSuccess;
  });

  return { list, isValid };
};

export function getPasswordStrength(password: string) {
  const validate = (v: PasswordValidations) => {
    return passwordValidators[v].fn(password);
  };

  const isStrengthHard = passwordStrengthProps[
    PasswordStrength.HARD
  ].conditions.every((c) => validate(c));

  if (isStrengthHard) return passwordStrengthProps[PasswordStrength.HARD];

  const isStrengthMedium = passwordStrengthProps[
    PasswordStrength.MEDIUM
  ].conditions.every((c) => validate(c));

  if (isStrengthMedium) return passwordStrengthProps[PasswordStrength.MEDIUM];

  return passwordStrengthProps[PasswordStrength.EASY];
}
