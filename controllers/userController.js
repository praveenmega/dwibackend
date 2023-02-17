const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

exports.postUser = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send({ error: error.details[0].message });

  let existingUser = await User.findOne({ email: req.body.email });

  if (existingUser)
    return res.status(400).send({ error: "User already registered." });

  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = newUser.generateAuthToken();

    return res.header('x-auth-token',token).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    let allUsers = await User.find();
    let result = allUsers.map(user => _.pick(user,['_id','name','email']));
    return res.send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    let currentUser = await User.findById(req.user._id).select('-password');

    if(!currentUser) return res.status(400).send({ error: "User not found." });

    return res.send(currentUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};