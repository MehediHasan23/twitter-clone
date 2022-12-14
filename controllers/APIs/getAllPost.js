/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");

/* get all post function */

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Tweet.find({});
    await User.populate(posts, { path: "tweetedBy", select: "-password" });
    await Tweet.populate(posts, { path: "postData" });
    await User.populate(posts, { path: "postData.tweetedBy" });
    await Tweet.populate(posts, { path: "replyTo" });
    await User.populate(posts, { path: "replyTo.tweetedBy" });

    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

/* export func */
module.exports = getAllPost;
