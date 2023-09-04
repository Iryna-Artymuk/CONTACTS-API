import { phone } from 'phone';

const normalisePhone = phoneNumber => {
  return phone(phoneNumber, {
    country: 'Ukraine',
  }).phoneNumber;
};
export default normalisePhone;
