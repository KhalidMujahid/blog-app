const jwt = require("jsonwebtoken");

module.exports.generateToken = async (id) => {
  try {
    const generatedToken = jwt.sign({ _id: id }, process.env.MY_KEY);
    return generatedToken;
  } catch (error) {
    throw new Error(error);
  }
};
