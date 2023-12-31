const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");

exports.register = async (req, res, next) => {
  const user = await User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (user) {
    return next(createError(404, "Username or email is already taken!"));
  }
  const hash = bcrypt.hashSync(req.body.password, 12);
  const newUser = new User({
    ...req.body,
    password: hash,
  });
  try {
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const { password, isAdmin, ...otherDetails } = user._doc;

    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
