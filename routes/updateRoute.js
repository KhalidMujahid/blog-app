// UPDATE ROUTES

const updateRouter = require("express").Router();

const {
  uploadAvatar,
  updateUserDetails,
} = require("../controllers/updateController");
const { uploads } = require("../middleware/uploadImage");

// Update user image

updateRouter.put("/upload/:id", uploads.single("image"), uploadAvatar);

// Update user profile details
updateRouter.patch("/update/info/:id", updateUserDetails);

module.exports = updateRouter;
