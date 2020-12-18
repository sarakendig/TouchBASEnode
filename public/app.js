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




function getVideo(callbacks) {
    var constraints = { audio: true, video: { width: 400, height: 300 } }

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      var video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
};
})}


function displayStream (stream, elementId) {
    let myvideo = document.getElementById(elementId);

    myvideo.srcObject = stream;

    window.remoteStream = stream;

    
}

getVideo({
    success: function(stream){
        window.localStream = stream;
        displayStream(stream, 'local');
    },
    error: function(err){
        alert('Please allow camera, stream not connecting');
    }
})

function muteAudio () {
    let notMuted =  window.localStream.getAudioTracks()[0].enabled;

    if (notMuted) {
       window.localStream.getAudioTracks()[0].enabled = false;
    } else {
       window.localStream.getAudioTracks()[0].enabled = true;
    }
  };

  function stopVideo () {
    let notStopped =  window.localStream.getVideoTracks()[0].enabled;

    if (notStopped) {
       window.localStream.getVideoTracks()[0].enabled = false;
    } else {
       window.localStream.getVideoTracks()[0].enabled = true;
    }
  }

// peer connection stops sockets from working


// const inputConnect = document.getElementById('connect');
// const peerid = document.getElementById('peer-id');

// const connect = document.getElementById('connection-button');


// const peer = new Peer(id, {
//     path: "/peerjs",
//     host: "/",
//     port: "443",
//   });


// peer.on('open', function(id) {
//     console.log("My Peer id is: " + id)
//     peerid.innerHTML = id;
// });


// peer.on('connection', function(connection){
// conn = connection;
// peerId = connection.peer;

// inputConnect.value = peerId;
// })

// connect.addEventListener('click', function(){
//     var conn = peer.connect(peerId);
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// peer.on('call', function(call) {
//   getUserMedia({video: true, audio: true}, function(window.localStream) {
//     call.answer(stream); // Answer the call with an A/V stream.
//     call.on('stream', function(stream) {
//       window.remoteStream = stream;
//       displayStream(stream, 'remote')
//     });
//   }, function(err) {
//     console.log('Failed to get local stream' ,err);
//   });
// });

// })


