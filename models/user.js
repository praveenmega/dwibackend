const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({_id: this._id,name:this.name,email: this.email},process.env.JWT_SECRET);
    return token;
};

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(2),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5),
    });

    return schema.validate(user);
}

const user = mongoose.model("user", userSchema);

module.exports.User = user;
module.exports.validateUser = validateUser;
