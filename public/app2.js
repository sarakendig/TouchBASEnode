const socket = io();

const peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443",
  }); 

const messageInput = document.getElementById('message-input');

const messageBox = document.getElementById('message-box');


const username = document.getElementById('username');

const typingDisplay = document.getElementById('typing');


  
  const videoGrid = document.getElementById('video-grid');
  
  
  const peers = {};
  let localVideoStream;
  
  const video = document.createElement('video');
  
  video.muted = true;
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
  })
  .then(stream => {
      localVideoStream = stream;
      addUserVideo(video, stream)
  })
  peer.on('call', call =>{
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideo => {
          addUserStream(video, userVideo)
  })
  });

  

  socket.on('joined', username => {
    connect(username, stream)
  })

  


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



peer.on('open', id => {
    console.log('My peer ID is: ' + id);
    socket.emit('join',  id);
    console.log('peer connected')
    
  })


// PEER JS


function addUserVideo(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  };



  function connect(username, stream) {
    const call = peer.call(username, stream)
    const video = document.createElement('video')
    call.on('stream', userVideo => {
      addUserVideo(video, userVideo)
    }),
     (err) => {
      console.error('Failed to get local stream', err);
     },
     call.on('close', () => {
       video.remove()
     })
     peers[username] = call
  };

  function muteAudio () {
    let notMuted = localVideoStream.getAudioTracks()[0].enabled;

    if (notMuted) {
      localVideoStream.getAudioTracks()[0].enabled = false;
    } else {
      localVideoStream.getAudioTracks()[0].enabled = true;
    }
  };

  function stopVideo () {
    let notStopped = localVideoStream.getVideoTracks()[0].enabled;

    if (notStopped) {
      localVideoStream.getVideoTracks()[0].enabled = false;
    } else {
      localVideoStream.getVideoTracks()[0].enabled = true;
    }
  }

 
  

