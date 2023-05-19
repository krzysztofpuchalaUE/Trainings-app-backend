export const isTitleValid = (title) => {
  if (title.length > 4) return true;
};

export const isCategoryValid = (category) => {
  if (category !== null) return true;
};

export const isStartDateValid = (startDate, endDate) => {
  if (endDate.length === 0) return Date.parse(startDate) > Date.now();
  if (endDate.length > 0)
    return (
      Date.parse(startDate) > Date.now() &&
      Date.parse(startDate) < Date.parse(endDate)
    );
};

export const isEndDateValid = (endDate, startDate) => {
  if (startDate.length === 0) {
    return Date.parse(endDate) > Date.now();
  }
  if (startDate.length > 0) return Date.parse(endDate) > Date.now() + 1;
};

export const isStartTimeValid = (startTime) => {
  if (startTime.length > 0) return true;
};

export const isEndTimeValid = (endTime) => {
  if (endTime.length > 0) return true;
};

export const isLanguageValid = (language) => {
  if (language !== "") return true;
};

export const isLocationValid = (location) => {
  if (location !== "") return true;
};

export const isLevelValid = (level) => {
  if (level !== "") return true;
};

export const isDescriptionValid = (description) => {
  if (description.length < 250) return true;
};

export const isFirstNameValid = (firstName) => {
  return firstName.trim() !== "";
};

export const isLastNameValid = (lastName) => {
  return lastName.trim() !== "";
};

export const isEmailValid = (email) => {
  return email.includes("@");
};

export const isPasswordValid = (password) => {
  return password.length > 6;
};
