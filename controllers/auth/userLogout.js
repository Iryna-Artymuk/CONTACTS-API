import asyncHandler from '../../decorators/acyncHandler.js';

const userLogOut = async (req, res) => {
  res.json({ message: ' LOGOUT' });
};

export default asyncHandler(userLogOut);
