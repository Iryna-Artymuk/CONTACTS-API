import { phone } from 'phone';

const normalisePhone = phoneNumber => {
  const UkrainianNumber = phone(phoneNumber, {
    country: 'Ukraine',
  }).phoneNumber;

  return UkrainianNumber?UkrainianNumber: phoneNumber

  
};
export default normalisePhone;
