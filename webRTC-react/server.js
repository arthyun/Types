const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use('/', express.static('public'));

// 소켓 전체 내용 확인란
io.on('connection', (socket) => {
  // console.log(socket.id);
  // console.log(`User Connected: ${socket.id}}`);
  // console.log(socket.client.conn.server.clientsCount);

  // 헤더확인
  // console.log(socket.handshake.headers);
  console.log(socket.handshake.headers);

  // 연결점
  socket.on('connect', (socket) => {
    console.log(socket.client.id);
  });

  // 연결끊음
  socket.on('disconnect', (socket) => {
    // console.log(socket);
    console.log('유저가 나갔습니다.');
  });

  // 응답점
  socket.on('message', ({ name, message }) => {
    // console.log(socket);
    io.emit('message', { name, message }); // 클라이언트로 보내줌
  });

  // 에러
  socket.on('error', (details) => {
    // console.log(details);
    return socket.disconnect();
  });
});

// io.on('connection', (socket) => {
//   socket.on('join', (roomId) => {
//     const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 };
//     const numberOfClients = roomClients.length;

//     // These events are emitted only to the sender socket.
//     if (numberOfClients == 0) {
//       console.log(`Creating room ${roomId} and emitting room_created socket event`);
//       socket.join(roomId);
//       socket.emit('room_created', roomId);
//     } else if (numberOfClients == 1) {
//       console.log(`Joining room ${roomId} and emitting room_joined socket event`);
//       socket.join(roomId);
//       socket.emit('room_joined', roomId);
//     } else {
//       console.log(`Can't join room ${roomId}, emitting full_room socket event`);
//       socket.emit('full_room', roomId);
//     }
//   });

//   // These events are emitted to all the sockets connected to the same room except the sender.
//   socket.on('start_call', (roomId) => {
//     console.log(`Broadcasting start_call event to peers in room ${roomId}`);
//     socket.broadcast.to(roomId).emit('start_call');
//   });
//   socket.on('webrtc_offer', (event) => {
//     console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp);
//   });
//   socket.on('webrtc_answer', (event) => {
//     console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
//   });
//   socket.on('webrtc_ice_candidate', (event) => {
//     console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
//   });
// });

// START THE SERVER =================================================================
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 9999;
server.listen(PORT, () => {
  console.log(`Server Listening On ${PORT}`);
});
