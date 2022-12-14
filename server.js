/* dependencies */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorhandler");
const authRoute = require("./routes/auth/authRoutes");

/* initialize app */
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "pug");
dotenv.config();

/* add database */
const mongoose = require("mongoose");
const { cookie } = require("express-validator");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/home/homeRoute");
const tweetRoute = require("./routes/APIs/tweetPost");
const { redisClient } = require("./utilities/cacheManager");
const singlePost = require("./routes/APIs/singlePost");

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRETE));

/* route */
/* app.get("/", (req, res) => {
  res.render("pages/auth/createNewPassword", {
    error: {},
    user: {},
    otp: {},
  });
}); */

app.use(authRoute);
app.use("/posts", tweetRoute);

app.use("/", singlePost);

app.use("/", homeRouter);

/* not found handler */
app.use(notFoundHandler);

/* error handler */
app.use(errorHandler);

/* app listening */
redisClient.connect();
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`server is running @${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
