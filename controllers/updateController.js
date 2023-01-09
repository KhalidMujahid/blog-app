const User = require("../models/User");

// Upload Profile Picture

module.exports.uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if There is an image
    if (id) {
      // Check if the user id exit
      const checkIfUserExit = await User.findById({ _id: id });

      if (checkIfUserExit) {
        //Upload the image
        const uploadImage = await User.findByIdAndUpdate(
          { _id: id },
          {
            $set: { profile_image: req.file.filename },
          }
        );

        if (uploadImage) {
          return res.status(200).send("Upload successfully!");
        } else {
          return res
            .status(401)
            .send("Something Went wrong please try again later");
        }
      } else {
        return res.status(403).send("Invalid user id");
      }
    } else {
      // If not
      return res.status(401).send("ID is required!");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};

// Update User details

module.exports.updateUserDetails = async (req, res) => {
  try {
    // Get user id and other info from the body and params
    const { id } = req.params;
    const { fname, lname, email, bio } = req.body;

    // Verify the ID
    const verifyUserID = await User.findById({ _id: id });
    if (verifyUserID) {
      // Check if email exits

      const verifyEmailIfExit = await User.findOne({ email });
      if (!verifyEmailIfExit)
        return res.status(401).send("Email does not exit!");

      await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            fname: fname,
            lname: lname,
            bio: bio,
          },
        }
      )
        .then(() => {
          res.status(200).send("Profile Details Uploaded");
        })
        .catch((error) => {
          res.status(402).send("Something wrong please try again later");
        });
    } else {
      res.status(401).send("Invalid User id");
    }
  } catch (error) {
    res.status(501).send(error);
  }
};
