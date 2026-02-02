const socket = io();

function startGame() {
  socket.emit("startGame");
}

socket.on("multiplier", (value) => {
  document.getElementById("multiplier").innerText = value + "x";
});

socket.on("crash", (point) => {
  alert("💥 Crashed at " + point + "x");
});
