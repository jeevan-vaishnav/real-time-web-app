const socket = io(); //send event and recv event

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.messageInput.value;

  socket.emit("sendMessage", message, (messageCallback) => {
    console.log("The message was",messageCallback);
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
