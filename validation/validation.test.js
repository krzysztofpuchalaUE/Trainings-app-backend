import * as validation from "./validation.js";
const title = "Machne learining";
const category = "data science";
const startDate = "2023-06-01";
const endDate = "2023-07-22";
const startTime = "16:00:00";
const endTime = "19:00:00";
const language = "polish";
const location = "remote";
const level = "intermediate";
const description = "description";
const trainerId = "1";

test("Properly validate form", () => {
  expect(validation.isTitleValid(title)).toBe(true);
  expect(validation.isCategoryValid(category)).toBe(true);
  expect(validation.isCategoryValid(undefined)).not.toBe(true);
  expect(validation.isStartDateValid(startDate, endDate)).toBe(true);
  expect(validation.isEndDateValid(endDate, startDate)).toBe(true);
  expect(validation.isLanguageValid(language)).toBe(true);
  expect(validation.isStartTimeValid(startTime)).toBe(true);
  expect(validation.isEndTimeValid(endTime)).toBe(true);
  expect(validation.isLocationValid(location)).toBe(true);
  expect(validation.isLevelValid(level)).toBe(true);
  expect(validation.isDescriptionValid(description)).toBe(true);

  expect(validation.isPasswordValid("ala")).not.toBe(true);
  expect(validation.isEmailValid("blablabla.321")).not.toBe(true);
  expect(validation.isEmailValid("blablabla@321")).toBe(true);
  expect(validation.isFirstNameValid("")).toBe(false);
  expect(validation.isLastNameValid("Kowalski")).toBe(true);
});
