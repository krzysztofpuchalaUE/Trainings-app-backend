import * as validation from "../validation/validation.js";

test("Properly validate auth form password", () => {
  expect(validation.isPasswordValid("ala")).not.toBe(true);
  expect(validation.isPasswordValid("crc202")).not.toBe(true);
  expect(validation.isPasswordValid("crc2023")).toBe(true);
});

test("Properly validate auth form email", () => {
  expect(validation.isEmailValid("blablabla.321")).not.toBe(true);
  expect(validation.isEmailValid("blablabla@321")).toBe(true);
});

test("properly validate auth form first name", () => {
  expect(validation.isFirstNameValid("")).not.toBe(true);
  expect(validation.isFirstNameValid("Jack")).toBe(true);
});

test("Properly validate form last name", () => {
  expect(validation.isLastNameValid("Kowalski")).toBe(true);
  expect(validation.isLastNameValid("")).not.toBe(true);
});
