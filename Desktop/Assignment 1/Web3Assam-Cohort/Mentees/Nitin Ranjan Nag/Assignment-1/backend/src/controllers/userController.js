const userService = require('../services/userService');

const getUser = (req, res, next) => {
  try {
    const user = userService.getUser();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res, next) => {
  try {
    const updatedUser = userService.updateUser(req.body);
    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
};

