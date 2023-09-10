import { HttpError } from '../helpers/index.js';
import Joi from 'joi'; // бібліотека валідації

const JoiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const vadidateFavorite = (req, res, next) => {
  const validateResult = JoiFavoriteSchema.validate(req.body);
  // console.log('validateResult: ', validateResult);
  const { error } = validateResult;

  if (error) throw HttpError(400, error.message);
  // якщо не буде всіх даних  error === true спрацює HttpError(400, validateResult.messages) і код перерветься спрацює функція обробки помилок
  //  error.message буде message з схеми валідації
  next();
};

export default vadidateFavorite;
