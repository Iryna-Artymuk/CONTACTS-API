import asyncHandler from '../../decorators/acyncHandler.js';

const userLogin = async (req, res) => {
  res.json({ message: ' LOGIN' });
};

export default asyncHandler(userLogin);
