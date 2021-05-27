const express = require("express");
const socketIo = require("socket.io");
const index = require("./routes/index");
const cityController = require('./src/controllers/city.controller');
const app = express();


app.set('PORT', process.env.PORT || 4001);
app.use(index);

const server = app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`)
});

const io = socketIo(server); // < Interesting!
let interval;

io.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);

  socket.on("city:get", async (data) => {
    socket.emit("city:get", await cityController.getCityCoordinates())
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});




