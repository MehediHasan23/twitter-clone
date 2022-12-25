const { Server } = require("socket.io");
const http = require("http");
const httpSocketServer = http.createServer();

const io = new Server(httpSocketServer, {
  cors: `http://localhost:3000/`,
  method: ["GET", "POST", "PUT", "DELETE"],
});

io.on("connection", socket => {
  socket.on("setup", user => {
    socket.join(user._id);
    io.to(user._id).emit("connected");
    console.log(user.firstName + " connected");

    socket.on("disconnect", () => {
      console.log(user.firstName + " disconnected");
    });
  });
});

module.exports = httpSocketServer;
