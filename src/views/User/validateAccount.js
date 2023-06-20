/* eslint-disable no-useless-escape */
export default function validateAccount({ userName, birthday, direction }) {
  const isBlankSpace = new RegExp("^\\s+$");

  const onlyAlphabet = /[\p{L}-]+/u;
  const isBirthday = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  const error = {};

  if (!direction || isBlankSpace.test(direction))
    error.direction = "Insert your address";

  if (!userName || isBlankSpace.test(userName))
    error.userName = "Insert your userName";
  else if (!onlyAlphabet.test(userName)) error.userName = "No numbers allowed";
  else if (userName.trim().length > 20)
    error.userName = `Maximum number of characters: 20 (${
      userName.trim().length
    }/20)`;

  if (!birthday || isBlankSpace.test(birthday))
    error.birthday = "Insert your birthday";
  else if (!isBirthday.test(birthday))
    error.birthday = "The date format should be yyyy-mm-dd";
  else if (birthday.trim().length > 10)
    error.birthday = `Maximum number of numbers: 10 (${
      birthday.trim().length
    }/10)`;

  return error;
}
