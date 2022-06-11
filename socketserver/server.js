const http = require("http");
const cors = require("cors");
const Express = require("express");
const app = Express();
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"]                                       //<-------------- process.env.FRONT_END_URL
  }
});

let players = [];
let user = Object.values(players);
let connectionsCounter = 0;
let guessers = [];
let count = 0;
let rooms = [];

io.sockets.on('connection', (socket) => {
  //////////////////////////////////////////////
  socket.on('room', (room) => {
    socket.join(room)
    game = room;
    //
    rooms.push(room)
    //
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));
    console.log(roomMatch, 'roommatchhhhhhhh');
    io.to(roomMatch[0]).emit('room', roomMatch[0]);
  });
  ////////////////////////////////////////////////////
  socket.on('chat message', ({ message, data }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    let user = players.find((user) => user.id === data && user.room == roomMatch[0]);
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
    let actualPlayers = players.filter(player => player.room == roomMatch[0]);
    io.to(roomMatch[0]).emit('navigate', actualPlayers[count]);
    count++
  });
  /////////////////////////////////////////////////////
  socket.on('start', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('start', word);
  });
  //////////////////////////////////////////////////////////
  socket.on('updateStores', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    connectionsCounter++;
    players = [...players, data];

    let playersInRoom = players.filter(player => {
      return player.room == roomMatch[0]
    });

    io.to(roomMatch[0]).emit('updateStores', playersInRoom);

  });
  ////////////////////////////////////////////////////
  socket.on('disconnect', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    // let playersInRoom = players.filter(player => {
    //   console.log(player, '<----player', roomMatch[0], 'does this work in scope??') 
    //   return player.room == roomMatch[0]
    // }); MIGHT NOT NEED THIS!!!!!!!!!!!!!!!!!!!!

    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    let takenOutUser = players.filter((player) => {
      return player.id != socket.id;
    });
    players = takenOutUser;
    io.to(roomMatch[0]).emit('updateStores', takenOutUser);
  });
  //////////////////////////////////////////////////////
  socket.on('roundOver', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    players.forEach((player) => {
      if (player.room == roomMatch[0]) {
        player.hasGuessed = false
      }
    });
    io.to(roomMatch[0]).emit('roundOver', word);
  });
  /////////////////////////////////////////////////////
  socket.on('drawer', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));


    let playersInRoom = players.filter(player => {
      return player.room == roomMatch[0]
    });


    if (count >= playersInRoom.length) {
      count = 0;
    }
    io.to(roomMatch[0]).emit('drawer', playersInRoom[count]);
    count++
  });
  /////////////////////////////////////////////////////
  socket.on('getUsers', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));


    let playersInRoom = players.filter(player => {
      return player.room == roomMatch[0]
    });

    let users = Object.entries(playersInRoom);
    io.to(roomMatch[0]).emit('joined players', users);
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
    guessers.push(pointAdd);

    let guessersInTheRoom = guessers.filter(guesser => {
      return guesser.room == roomMatch[0];
    })
    io.to(roomMatch[0]).emit('updateStores', players);
    io.to(roomMatch[0]).emit('addPoints', { pointsAdded, data, guessersInTheRoom });
  });
  //////////////////////////////////////
  socket.on('allGuessed', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('roundOver', word);
    io.to(roomMatch[0]).emit('allGuessed');
    guessers = guessers.filter(guesser => {
      return guesser.room != roomMatch[0];
    });
  });
  ////////////////////////////////////
  socket.on('gameOver', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.filter(room => roomArray.includes(room));

    io.to(roomMatch[0]).emit('gameOver', players);
  });
});


server.listen(process.env.PORT, () => console.log("server running on port 3000 🚀"));             // <-------------------- process.env.PORT
