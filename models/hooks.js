export const handelSchemsErrorStatus = (error, data, next) => {
  error.status = 400;
  next();
};
