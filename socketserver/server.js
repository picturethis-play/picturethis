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
console.log('users duhhhh', user);
let connectionsCounter = 0;
let guessers = [];
let count = 0;
let rooms = [];

io.sockets.on('connection', (socket) => {

  //Using different way of validating room here for faster connection(?) and then for the rest its based on array from Set of rooms
  let game;
  //////////////////////////////////////////////
  socket.on('room', (room) => {
    socket.join(room)
    game = room;
    //
    rooms.push(room)
    //
    io.to(game).emit('room', game);
  });
  ////////////////////////////////////////////////////
  socket.on('chat message', ({ message, data }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    let user = players.find((user) => user.id === data);
    io.to(roomMatch[0]).emit('chat message', { message: message, user: user, guessed: false });
  });
  ///////////////////////////////////////////////////
  socket.on('draw', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('draw', data);
  });
  //////////////////////////////////////////////////////
  socket.on('clear', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('clear');
  });
  ///////////////////////////////////////////////////
  socket.on('navigate', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
     console.log(count, 'count');
    io.to(roomMatch[0]).emit('navigate', players[count]);
    count++
  });
  /////////////////////////////////////////////////////
  socket.on('start', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    console.log(roomMatch[0], 'making sure this is the correct room');
    io.to(roomMatch[0]).emit('start', word);
  });
  //////////////////////////////////////////////////////////
  socket.on('updateStores', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    console.log('a user ' + data.name + ' connected');
    connectionsCounter++;
    players = [...players, data];
    console.log('players array betch', players);
    io.to(roomMatch[0]).emit('updateStores', players);
    console.log(connectionsCounter, 'connections counter, may need to change or remove');
  });
////////////////////////////////////////////////////
  socket.on('disconnect', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    let takenOutUser = players.filter((x) => {
      return x.id != socket.id;
    });
    players = takenOutUser;
    io.to(roomMatch[0]).emit('updateStores', takenOutUser);

  });
//////////////////////////////////////////////////////
  socket.on('roundOver', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    players.forEach((player) => (player.hasGuessed = false));
    io.to(roomMatch[0]).emit('roundOver', word);
  });
/////////////////////////////////////////////////////
  socket.on('drawer', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));


    console.log(count, 'count for choosing random player i think');
    if (count >= players.length) {
      count = 0;
    }
    io.to(roomMatch[0]).emit('drawer', players[count]);
    count++
  });
/////////////////////////////////////////////////////
  socket.on('getUsers', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    let user = Object.entries(players);
    console.log(user, 'USERssssssssss');
    io.to(roomMatch[0]).emit('joined players', user);
  });
//////////////////////////////////////////////////////
  socket.on('finishedPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('finishedPosition');
  });
////////////////////////////////////////////////////
  socket.on('startPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('startPosition');
  });
  //////////////////////////////////////
  socket.on('timer', (timer) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('timer', timer);
  });
  /////////////////////////////////////
  socket.on('points', ({ data, pointCount, pointsAdded }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    let pointAdd = players.find((player) => player.id === data);
    pointAdd.points = pointAdd.points + pointCount;
    guessers.push(pointAdd.id);
    io.to(roomMatch[0]).emit('updateStores', players);
    io.to(roomMatch[0]).emit('addPoints', { pointsAdded, data, guessers });
  });
  //////////////////////////////////////
  socket.on('allGuessed', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('roundOver', word);
    io.to(roomMatch[0]).emit('allGuessed');
    guessers = [];
  });
  ////////////////////////////////////
  socket.on('gameOver', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('gameOver', players);
  });
});


server.listen(3000, () => console.log("server running on port 3000 🚀"));             // <-------------------- process.env.PORT
