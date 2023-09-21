const getCurrentUser = (req, res) => {
  const { user } = req;

  res.json({
    name: user.name,
    email: user.email,
  });
};

export default getCurrentUser;
