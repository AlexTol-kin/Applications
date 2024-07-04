const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model("Login", UserSchema);

module.exports = Login;
