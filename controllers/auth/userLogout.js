import asyncHandler from '../../decorators/acyncHandler.js';
import User from '../../models/users/Users.js';

const userLogOut = async (req, res) => {
  const { user } = req;

  await User.findByIdAndUpdate(user._id, { token: '' });
  res.json({
    message: 'successfully logout',
  });
};

export default asyncHandler(userLogOut);
