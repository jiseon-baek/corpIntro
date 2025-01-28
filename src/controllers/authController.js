const User = require('../models/user');
const jwt = require('jsonwebtoken');
const errorMessages = require('../messages/errorMessages');
const successMessages = require('../messages/successMessages');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: errorMessages.emailAlreadyExists,
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: successMessages.userRegistered });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({
          message: errorMessages.invalidCredentials,
        });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          message: errorMessages.invalidCredentials,
        });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
