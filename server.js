const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { generateCrashPoint } = require("./game/crashLogic");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let gameRunning = false;
let multiplier = 1.0;
let crashPoint = 0;

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("startGame", () => {
    if (gameRunning) return;

    gameRunning = true;
    multiplier = 1.0;
    crashPoint = generateCrashPoint();

    const interval = setInterval(() => {
      multiplier += 0.01;
      io.emit("multiplier", multiplier.toFixed(2));

      if (multiplier >= crashPoint) {
        io.emit("crash", crashPoint);
        clearInterval(interval);
        gameRunning = false;
      }
    }, 100);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
