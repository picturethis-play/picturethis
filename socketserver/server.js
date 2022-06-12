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
    socket.join(room);
    game = room;
    //
    rooms.push(room)
    //
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));
    console.log(roomMatch, 'roommatchhhhhhhh');

    console.log(socket.rooms, 'rooms');
    io.to(roomMatch).emit('room', roomMatch);
  });

  ////////////////////////////////////////////////////
  socket.on('chat message', ({ message, data }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    let user = players.find((user) => user.id === data && user.room == roomMatch);
    console.log(user, 'user from correct room????')
    io.to(roomMatch).emit('chat message', { message: message, user: user, guessed: false });

  });
  ///////////////////////////////////////////////////
  socket.on('draw', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    socket.to(roomMatch).emit('draw', data);
  });
  //////////////////////////////////////////////////////
  socket.on('clear', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('clear');
  });
  ///////////////////////////////////////////////////
  socket.on('navigate', () => {
    let roomArray = Array.from(socket.rooms);

    let roomMatch = rooms.find(room => roomArray.includes(room));
    let actualPlayers = players.filter(player => player.room == roomMatch);
    console.log(count, 'count');
    console.log(actualPlayers, 'lets see if the players are being filtered by room or what')
    io.to(roomMatch).emit('navigate', actualPlayers[count]);

    count++
  });
  /////////////////////////////////////////////////////
  socket.on('start', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    console.log(roomMatch, 'making sure this is the correct room');
    io.to(roomMatch).emit('start', word);

  });
  //////////////////////////////////////////////////////////
  socket.on('updateStores', (data) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    console.log('a user ' + data.name + ' connected');
    console.log(roomMatch, 'ROOMMATRCHERRRRR');

    connectionsCounter++;
    players = [...players, data];

    let playersInRoom = players.filter(player => {
      console.log(player, '<----player', roomMatch, 'does this work in scope??')
      return player.room == roomMatch

    });


    console.log(playersInRoom, 'array of players in this room');

    io.to(roomMatch).emit('updateStores', playersInRoom);
    console.log(connectionsCounter, 'connections counter, may need in change or remove');

  });
  ////////////////////////////////////////////////////
  socket.on('disconnect', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    // let playersInRoom = players.filter(player => {
    //   console.log(player, '<----player', roomMatch, 'does this work in scope??') 
    //   return player.room == roomMatch
    // }); MIGHT NOT NEED THIS!!!!!!!!!!!!!!!!!!!!

    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    let takenOutUser = players.filter((player) => {
      return player.id != socket.id;
    });
    players = takenOutUser;
    io.to(roomMatch).emit('updateStores', takenOutUser);
  });
  //////////////////////////////////////////////////////
  socket.on('roundOver', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    players.forEach((player) => {
      if (player.room == roomMatch) {
        player.hasGuessed = false
      }
    });
    io.to(roomMatch).emit('roundOver', word);
  });
  /////////////////////////////////////////////////////
  socket.on('drawer', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));


    let playersInRoom = players.filter(player => {

      console.log(player, '<----player', roomMatch, 'does this work in scope??')
      return player.room == roomMatch

    });


    if (count >= playersInRoom.length) {
      count = 0;
    }
    console.log(playersInRoom[count]);
    console.log(playersInRoom[count]);
    io.to(roomMatch).emit('drawer', playersInRoom[Math.floor(Math.random() * playersInRoom.length)]);
    count++
  });
  /////////////////////////////////////////////////////
  socket.on('getUsers', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));


    let playersInRoom = players.filter(player => {

      console.log(player, '<----player', roomMatch, 'does this work in scope??')
      return player.room == roomMatch

    });

    let users = Object.entries(playersInRoom);

    console.log(users, 'USERssssssssss');

    io.to(roomMatch).emit('joined players', users);

  });
  //////////////////////////////////////////////////////
  socket.on('finishedPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('finishedPosition');
  });
  ////////////////////////////////////////////////////
  socket.on('startPosition', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('startPosition');
  });
  //////////////////////////////////////
  socket.on('timer', (timer) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('timer', timer);
  });
  /////////////////////////////////////
  socket.on('points', ({ data, pointCount, pointsAdded }) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    let pointAdd = players.find((player) => player.id === data);
    pointAdd.points = pointAdd.points + pointCount;
    guessers.push(pointAdd);

    let guessersInTheRoom = guessers.filter(guesser => {

      console.log(guesser.room, 'guesser.room is working or no?')
      return guesser.room == roomMatch;
    })

    console.log(guessersInTheRoom, 'guessas in da room');

    io.to(roomMatch).emit('updateStores', players);
    io.to(roomMatch).emit('addPoints', { pointsAdded, data, guessersInTheRoom });
  });
  //////////////////////////////////////
  socket.on('allGuessed', (word) => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('roundOver', word);
    io.to(roomMatch).emit('allGuessed');
    guessers = guessers.filter(guesser => {
      return guesser.room != roomMatch;
    });
  });
  ////////////////////////////////////
  socket.on('gameOver', () => {
    let roomArray = Array.from(socket.rooms);
    let roomMatch = rooms.find(room => roomArray.includes(room));

    io.to(roomMatch).emit('gameOver', players);

  });
});


server.listen(process.env.PORT, () => console.log("server running on port 3000 🚀"));             // <-------------------- process.env.PORT
