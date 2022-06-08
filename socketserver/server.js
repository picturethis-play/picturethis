const http = require("http");
const cors = require("cors");
const Express = require("express");
const app = Express();
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ["GET", "POST"]                                       //<-------------- process.env.FRONT_END_URL
  }
});

let players = [];
let user = Object.values(players);
console.log('user', user);
let connectionsCounter = 0;
let guessers = [];
let count = 0;
let rooms = [];

io.sockets.on('connection', (socket) => {
  let game;
  socket.on('room', (room) => {
    socket.join(room)
    game = room;
    //
    rooms.push(room)
    //
    console.log(game);
    console.log(socket.rooms);
    io.to(game).emit('room', game);
  })
  socket.on('chat message', ({ message, data }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    let user = players.find((user) => user.id === data);
    io.to(roomMatch[0]).emit('chat message', { message: message, user: user, guessed: false });
  });
  socket.on('draw', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('draw', data);
  });
  socket.on('clear', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('clear');
  });
  socket.on('navigate', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('navigate', players[count]);
    count++
  });
  socket.on('start', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    console.log(roomMatch[0]);
    io.to(roomMatch[0]).emit('start', word);
  });
  socket.on('updateStores', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    console.log('a user ' + data.name + ' connected');
    connectionsCounter++;
    players = [...players, data];
    console.log('uzers', players);
    io.to(roomMatch[0]).emit('updateStores', players);
    console.log(connectionsCounter);
  });

  socket.on('disconnect', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    console.log('ysysysysysys', players);
    let takenOutUser = players.filter((x) => {
      return x.id != socket.id;
    });
    players = takenOutUser;
    console.log('newnenwew', takenOutUser);
    io.to(roomMatch[0]).emit('updateStores', takenOutUser);
    console.log(connectionsCounter);
  });

  socket.on('roundOver', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    players.forEach((player) => (player.hasGuessed = false));
    io.to(roomMatch[0]).emit('roundOver', word);
  });

  socket.on('drawer', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    console.log(socket.rooms, 'dese are da rooms');
    console.log('random user requested');
    console.log('randomuserreq', players);
    console.log(count);
    if (count > players.length) {
      count = 0;
    }
    io.to(roomMatch[0]).emit('drawer', players[count]);
    count++
  });

  socket.on('getUsers', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    let user = Object.entries(players);
    console.log(user, 'USER');
    io.to(roomMatch[0]).emit('joined players', user);
  });

  socket.on('finishedPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('finishedPosition');
  });

  socket.on('startPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('startPosition');
  });
  socket.on('timer', (timer) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('timer', timer);
  });
  socket.on('points', ({ data, pointCount, pointsAdded }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    let pointAdd = players.find((player) => player.id === data);
    pointAdd.points = pointAdd.points + pointCount;
    guessers.push(pointAdd.id);
    io.to(roomMatch[0]).emit('updateStores', players);
    io.to(roomMatch[0]).emit('addPoints', { pointsAdded, data, guessers });
  });
  socket.on('allGuessed', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('roundOver', word);
    io.to(roomMatch[0]).emit('allGuessed');
    guessers = [];
  });
  socket.on('gameOver', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomArray, 'does this work?');
    console.log(roomMatch[0], 'lets see if dis works');
    io.to(roomMatch[0]).emit('gameOver', players);
  });
});


server.listen(3000, () => console.log("server running on port 3000 🚀"));             // <-------------------- process.env.PORT
