const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recieve_message", data);
  });
});

httpServer.listen(4000, () => {
  console.log("Server is running");
});
