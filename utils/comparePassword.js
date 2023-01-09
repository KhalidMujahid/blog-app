const bcrypt = require("bcrypt");

// Function to compare password
module.exports.comparePassword = async (current_pswd, db_pswd) => {
  try {
    const password = await bcrypt.compare(current_pswd, db_pswd);
    if (password) return true;

    return false;
  } catch (error) {
    throw new Error(error);
  }
};
