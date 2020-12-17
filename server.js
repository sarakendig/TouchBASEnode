const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

// PORT

const PORT = process.env.PORT || 5000;


// PEER JS

app.use('/peerjs', peerServer);

// MIDDLEWARE

app.set('view engine', 'ejs')
app.use(express.static('public'))


// ROUTES


app.get('/', (req, res) => {
    res.redirect(`/${roomId}`);
    
});


app.get('/:room', (req,res) => {
    res.render('room', {rooms: req.params.room})
})

const roomId = uuidV4();


// SOCKET


io.on('connection', function(socket) {
    // const id = socket.id;
    // console.log('client connected ' + username)
    console.log('roomId: ' + roomId)
    socket.join(roomId);

    socket.on('join', (roomId, username) => {
    io.to(roomId).emit('New user joined', username);
})
    
    socket.on('chat', (data) => {
        console.log('message sent: ' + data.msg + ' from: ' + data.username)
        io.to(roomId).emit('chat', data );
    })

    socket.on('typing', (data) => {
        console.log('typing' + data.username)
        socket.to(roomId).broadcast.emit('typing', data ) 
        
    })


        
})




server.listen(PORT, () => console.log(`Listening on port ${PORT}`));






// setup peerjs server with express : https://stackoverflow.com/questions/26712426/setup-peerjs-server-combined-with-express


// uuid: https://www.npmjs.com/package/uuid


// peerjs https://github.com/peers/peerjs

// https://riptutorial.com/webrtc/example/29031/get-access-to-your-audio-and-video-using-getusermedia---api--hello-webrtc-