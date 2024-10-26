
const socket =  io() //send event and recv event

socket.on('message',(msg)=>{
    console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('Send button clicked!')

    // const message = document.querySelector('input').value
    const message = e.target.elements.messageInput.value;

    socket.emit('sendMessage',message)

})



