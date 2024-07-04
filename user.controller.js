const User = require("./models/Login");

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await User.findOne({ password });

  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }
  return user;

  // return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { loginUser };
