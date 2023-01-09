const bcrypt = require("bcrypt");

// Hashed password function
module.exports.hashedPassword = async (current_pswd) => {
  try {
    const hashed = await bcrypt.hash(current_pswd, 13);
    if (hashed) return hashed;

    throw new Error("error occured!");
  } catch (error) {
    console.log(error);
  }
};
