const followersHandler = require("../../controllers/follow/followersHandler");
const followingHandler = require("../../controllers/follow/followingHandler");
const followHandler = require("../../controllers/profile/followHandler");
const postHandler = require("../../controllers/profile/postHandler");
const repliesHandler = require("../../controllers/profile/repliesHandler");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

/* dependencies */
const profileRoute = require("express").Router();

/* post handler */
profileRoute.get(
  "/:username",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  postHandler
);

/* replies handler */
profileRoute.get(
  "/:username/replies",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  repliesHandler
);

/* follow or un-follow handler */
profileRoute.put(
  "/:id/follow",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  followHandler
);

/* get all followers */
profileRoute.get(
  "/:username/followers",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  followersHandler
);

/* get all followings */
profileRoute.get(
  "/:username/following",
  htmlResponse(`Profile-${process.env.APP_NAME}`),
  loginChecker,
  followingHandler
);

module.exports = profileRoute;
