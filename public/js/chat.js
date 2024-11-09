const socket = io(); //send event and recv event

//elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $locationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector('#locationMessage-template').innerHTML

//options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on("message", (msg) => {
  const html = Mustache.render(messageTemplate, { message: msg.text,username:msg.username,createAt:moment(msg.createAt).format('h:mm a') });
  $messages.insertAdjacentHTML("beforeend", html);
});


socket.on('locationMessage',(msg)=>{
    console.log(msg);
    const html = Mustache.render(locationMessageTemplate,{url:msg.url,username:msg.username,createAt:moment(msg.createAt).format('h:mm a') });
    $messages.insertAdjacentHTML('beforeend',html);
})

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //disable
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.messageInput.value;

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});



document.querySelector("#send-location").addEventListener("click", () => {
  $locationButton.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $locationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});

socket.emit('join',{username,room},(error)=>{
    if(error){
      alert(error)
      location.href ='/'
    }
});
