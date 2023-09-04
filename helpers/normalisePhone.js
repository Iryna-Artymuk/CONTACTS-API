import { phone } from 'phone';
// function  is cheking if number is ukrainian add +38 to the begining of the string or return same number
const normalisePhone = phoneNumber => {
  const UkrainianNumber = phone(phoneNumber, {
    country: 'Ukraine',
  }).phoneNumber;

  return UkrainianNumber ? UkrainianNumber : phoneNumber;
};
export default normalisePhone;
