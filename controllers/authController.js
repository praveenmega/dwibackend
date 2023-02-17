const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5),
    });

    return schema.validate(user);
}

exports.postAuth = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send({ error: error.details[0].message });

  let existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser)
    return res.status(400).send({ error: "Invalid email or password" });

  let validPassword = await bcrypt.compare(req.body.password,existingUser.password);

  if(!validPassword) return res.status(400).send({ error: "Invalid email or password" });

  try {
    const token = existingUser.generateAuthToken();
    return res.send(token);
  } catch (error) {
    return res.status(400).send(error);
  }
};