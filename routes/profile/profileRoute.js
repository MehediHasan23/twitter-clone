const postHandler = require("../../controllers/profile/postHandler");
const repliesHandler = require("../../controllers/profile/repliesHandler");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

/* dependencies */
const profileRoute = require("express").Router();

profileRoute.get(
  "/:username",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  postHandler
);
profileRoute.get(
  "/:username/replies",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  repliesHandler
);

module.exports = profileRoute;
