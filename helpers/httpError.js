const messageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};
// якщо другий парамерт не передавати при виклику функції   HttpError  в роутері  то в змінну підтавиться повідомлення з messageList
//фкнкція очікує 2 параметри status , message створює і повертає помилку
const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  console.log(`http error: ${error.message}`.red.bold.underline.bgBrightCyan);
  error.status = status;
  return error;
};

export default HttpError;
