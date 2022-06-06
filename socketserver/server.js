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
    console.log(game);
    console.log(socket.rooms);
    io.to(game).emit('room', game);
  })
  socket.on('chat message', ({ message, data }) => {
    let user = players.find((user) => user.id === data);
    io.to(game).emit('chat message', { message: message, user: user, guessed: false });
  });
  socket.on('draw', (data) => {
    io.to(game).emit('draw', data);
  });
  socket.on('clear', () => {
    io.to(game).emit('clear');
  });
  socket.on('navigate', () => {
    io.to(game).emit('navigate', players[count]);
    count++
  });
  socket.on('start', (word) => {
    console.log(game);
    io.to(game).emit('start', word);
  });
  socket.on('updateStores', (data) => {
    console.log('a user ' + data.name + ' connected');
    connectionsCounter++;
    players = [...players, data];
    console.log('uzers', players);
    io.to(game).emit('updateStores', players);
    console.log(connectionsCounter);
  });

  socket.on('disconnect', () => {
    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    console.log('ysysysysysys', players);
    let takenOutUser = players.filter((x) => {
      return x.id != socket.id;
    });
    players = takenOutUser;
    console.log('newnenwew', takenOutUser);
    io.to(game).emit('updateStores', takenOutUser);
    console.log(connectionsCounter);
  });

  socket.on('roundOver', (word) => {
    players.forEach((player) => (player.hasGuessed = false));
    io.to(game).emit('roundOver', word);
  });

  socket.on('drawer', () => {
    console.log('random user requested');
    console.log('randomuserreq', players);
    console.log(count);
    if (count > players.length) {
      count = 0;
    }
    io.to(game).emit('drawer', players[count]);
    count++
  });

  socket.on('getUsers', () => {
    let user = Object.entries(players);
    console.log(user, 'USER');
    io.to(game).emit('joined players', user);
  });

  socket.on('finishedPosition', () => {
    io.to(game).emit('finishedPosition');
  });

  socket.on('startPosition', () => {
    io.to(game).emit('startPosition');
  });
  socket.on('timer', (timer) => {
    io.to(game).emit('timer', timer);
  });
  socket.on('points', ({ data, pointCount, pointsAdded }) => {
    let pointAdd = players.find((player) => player.id === data);
    pointAdd.points = pointAdd.points + pointCount;
    guessers.push(pointAdd.id);
    io.to(game).emit('updateStores', players);
    io.to(game).emit('addPoints', { pointsAdded, data, guessers });
  });
  socket.on('allGuessed', (word) => {
    io.to(game).emit('roundOver', word);
    io.to(game).emit('allGuessed');
    guessers = [];
  });
  socket.on('gameOver', () => {
    io.to(game).emit('gameOver', players);
  });
});


server.listen(3000, () => console.log("server running on port 3000 🚀"));             // <-------------------- process.env.PORT
