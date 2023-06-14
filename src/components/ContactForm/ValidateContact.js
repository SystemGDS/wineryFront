export default function validate({
  name,
  lastname,
  phone,
  email,
  subject,
  message,
}) {
  const isBlankSpace = new RegExp("^\\s+$");
  const isPhoneNumber =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}/;
  const isEmailAddress = /\S+@\S+\.\S+/;
  const onlyAlphabet = /[\p{L}-]+/u;

  const error = {};

  if (!name || isBlankSpace.test(name)) error.name = "Insert your name";
  else if (!onlyAlphabet.test(name)) error.name = "No numbers allowed";
  else if (name.trim().length > 50)
    error.name = `Maximum number of characters: 50 (${name.trim().length}/50)`;

  if (!lastname || isBlankSpace.test(lastname))
    error.lastname = "Insert your lastname";
  else if (!onlyAlphabet.test(lastname)) error.lastname = "No numbers allowed";
  else if (lastname.trim().length > 50)
    error.lastname = `Maximum number of characters: 50 (${
      lastname.trim().length
    }/50)`;

  if (!phone || isBlankSpace.test(phone))
    error.phone = "Insert your phone number";
  else if (!isPhoneNumber.test(phone))
    error.phone = "Insert a valid phone number";

  if (!email || isBlankSpace.test(email))
    error.email = "Insert your email address";
  else if (!isEmailAddress.test(email))
    error.email = "Insert a valid email address";

  if (!subject || isBlankSpace.test(subject))
    error.subject = "Write your subject";

  if (!message || isBlankSpace.test(message))
    error.message = "Write your message";

  if (Object.keys(error).length) return error;
}
