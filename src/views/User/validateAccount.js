export default function validateAccount({
  username,
  birthday,
  addressLineOne,
  addressLineTwo,
  telephone,
}) {
  const isBlankSpace = new RegExp("^\\s+$");
  const isPhoneNumber =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}/;
  const onlyAlphabet = /[\p{L}-]+/u;
  const isBirthday = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  const error = {};

  if (!addressLineOne || isBlankSpace.test(addressLineOne))
    error.addressLineOne = "Insert your address";

  if (!addressLineTwo || isBlankSpace.test(addressLineTwo))
    error.addressLineTwo = "Insert your city";

  if (!username || isBlankSpace.test(username))
    error.username = "Insert your username";
  else if (!onlyAlphabet.test(username)) error.username = "No numbers allowed";
  else if (username.trim().length > 20)
    error.username = `Maximum number of characters: 20 (${
      username.trim().length
    }/20)`;

  if (!birthday || isBlankSpace.test(birthday))
    error.birthday = "Insert your birthday";
  else if (!isBirthday.test(birthday))
    error.birthday = "The date format should be yyyy-mm-dd";
  else if (birthday.trim().length > 10)
    error.birthday = `Maximum number of numbers: 10 (${
      birthday.trim().length
    }/10)`;

  if (!telephone || isBlankSpace.test(telephone))
    error.telephone = "Insert your phone number";
  else if (!isPhoneNumber.test(telephone))
    error.telephone = "Insert a valid phone number";

  return error;
}
