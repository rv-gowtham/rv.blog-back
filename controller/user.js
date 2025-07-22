const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password cannot be empty" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPwd });

    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, newUser });
  } catch (err) {
    console.error("Signup Error: ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email or password cannot be empty" });
  }

  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user });
  } else {
    return res.status(400).json({ error: "invalid credientials" });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ email: user.email });
};

module.exports = { userLogin, userSignUp, getUser };
