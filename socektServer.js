const { Server } = require("socket.io");
const http = require("http");
const httpSocketServer = http.createServer();

const io = new Server(httpSocketServer, {
  cors: ["http://localhost:3000/"],

  method: ["GET", "POST", "PUT", "DELETE"],
});

/* established socket connection on server site */
io.on("connection", socket => {
  socket.on("setup", user => {
    /* connect a new socket user in a room by his[database._id] */
    const userId = user._id;
    socket.join(userId);
    socket.emit("connected");
    console.log(user.firstName, " connected");

    /* disconnect a user */
    socket.on("disconnect", () => {
      console.log(user.firstName, " disconnected");
    });
  });
});

module.exports = httpSocketServer;
