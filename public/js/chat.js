const socket =  io() //send event and recv event

socket.on('countUpdated',(count)=>{
    console.log("The count has been update!", count)

})

document.querySelector('#increment').addEventListener('click',()=>{
    console.log('Clicked')
    socket.emit('increment');
});


