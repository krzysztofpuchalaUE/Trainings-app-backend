import * as validation from "../validation/validation.js";
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

test("Properly validate form title", () => {
  expect(validation.isTitleValid(title)).toBe(true);
  expect(validation.isTitleValid("bla")).not.toBe(true);
  expect(validation.isTitleValid("blab")).not.toBe(true);
});

test("Properly validate form category", () => {
  expect(validation.isCategoryValid(category)).toBe(true);
  expect(validation.isCategoryValid(undefined)).not.toBe(true);
});

test("Properly validate form start date", () => {
  expect(validation.isStartDateValid(startDate, endDate)).toBe(true);
  expect(validation.isStartDateValid("2023-12-01", "")).toBe(true);
  expect(validation.isStartDateValid("2023-04-01", "")).not.toBe(true);
  expect(validation.isStartDateValid("2023-09-01", "2023-08-01")).not.toBe(
    true
  );
});

test("Properly validate form end date", () => {
  expect(validation.isEndDateValid(endDate, startDate)).toBe(true);
  expect(validation.isEndDateValid("2023-08-01", "2023-08-01")).not.toBe(true);
  expect(validation.isEndDateValid("2023-09-01", "2023-10-01")).not.toBe(true);
  expect(validation.isEndDateValid("2025-10-08", "")).toBe(true);
});

test("Properly validate form language", () => {
  expect(validation.isLanguageValid(language)).toBe(true);
  expect(validation.isLanguageValid("")).not.toBe(true);
});

test("Properly validate form start time", () => {
  expect(validation.isStartTimeValid(startTime)).toBe(true);
  expect(validation.isStartTimeValid("")).not.toBe(true);
});

test("Properly validate form end time", () => {
  expect(validation.isEndTimeValid(endTime)).toBe(true);
  expect(validation.isEndTimeValid("")).not.toBe(true);
});

test("Properly validate form location", () => {
  expect(validation.isLocationValid(location)).toBe(true);
  expect(validation.isLocationValid("")).not.toBe(true);
});

test("Properly validate form level", () => {
  expect(validation.isLevelValid(level)).toBe(true);
  expect(validation.isLevelValid("")).not.toBe(true);
});

test("Properly validate form description", () => {
  expect(validation.isDescriptionValid(description)).toBe(true);
  expect(
    validation.isDescriptionValid(
      "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    )
  ).not.toBe(true);
});
