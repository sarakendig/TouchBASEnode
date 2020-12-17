const socket = io();

const messageInput = document.getElementById('message-input');

const messageBox = document.getElementById('message-box');


const username = document.getElementById('username');

const typingDisplay = document.getElementById('typing');




// typing

messageInput.addEventListener('keypress', (e) => {
    if(e.key!='Enter') {
        socket.emit('typing', {username: username.value})
    }
    console.log('typing')
})

// send messages via form submit

$('form').submit(e => {
    e.preventDefault()
    
    socket.emit('chat', {
        msg: messageInput.value,
        username: username.value
    })
})





socket.on('typing', (data) => {
    
        typingDisplay.innerHTML = '<p><i>' + data.username + ' is typing...</i></p>'
})

// append chat messages


socket.on('chat', (data)=>{
    typingDisplay.innerHTML="";

    messageBox.innerHTML += '<div id="messageBubble"> <p> <b>' + data.username + ': </b>' + data.msg + '</p> </div>'
})

