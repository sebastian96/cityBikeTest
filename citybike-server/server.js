const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const cityController = require("./src/controllers/city.controller");
const port = process.env.PORT || 4001;
const app = express();


app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval;

io.on("connection", socket => {
  console.log(`New connection ${socket.id}`);

  socket.on("city:get", async (data) => {
    socket.emit("city:get", await cityController.getCity());
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));



