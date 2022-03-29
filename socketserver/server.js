const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'http://192.168.1.201:8080',
  },
});

let players = [];
let user = Object.values(players);
console.log('user', user);
const userArray = [];
let connectionsCounter = 0;

io.on('connection', (socket) => {
  // socket.emit('new', socket.id);
  socket.on('chat message', ({ message, data }) => {
    let user = players.find((user) => user.id === data);
    io.emit('chat message', { message: message, user: user });
  });
  socket.on('draw', (data) => {
    io.emit('draw', data);
  });
  socket.on('clear', () => {
    io.emit('clear');
  });
  socket.on('navigate', () => {
    io.emit('navigate', players[Math.floor(Math.random() * players.length)]);
  });
  socket.on('start', (word) => {
    io.emit('start', word);
  });
  // socket.on('nextRound', (word) => {
  //   io.emit('nextRound', word);
  // });
  socket.on('updateStores', (data) => {
    console.log('a user ' + data + ' connected');
    connectionsCounter++;
    // players[socket.id] = data;
    players = [...players, data];
    // console.log('user object', players);
    // let user = Object.values(players);
    // console.log('user array', user);
    // userArray.push(data);
    console.log('uzers', players);
    io.emit('updateStores', players);
    console.log(connectionsCounter);
  });

  socket.on('disconnect', () => {
    connectionsCounter === 0 ? (connectionsCounter = 0) : connectionsCounter--;
    // console.log(
    //   `user ${players.length > 0 ? players.find((o) => o.id === socket.id).name : null} disconnected`,
    // );
    // players.filter((x) => {
    //   console.log('filter', x);
    //   // console.log(socket.id);
    //   return x.id != socket.id;
    // })
    console.log('ysysysysysys', players);
    let takenOutUser = players.filter((x) => {
      console.log('filter', x);
      console.log(x.id);
      console.log(socket.id);
      console.log(socket.id === x.id);
      return x.id != socket.id;
    });
    players = takenOutUser;
    console.log('newnenwew', takenOutUser);
    io.emit('updateStores', takenOutUser);
    console.log(connectionsCounter);
    // delete players[socket.id];
  });

  socket.on('roundOver', (word) => {
    io.emit('roundOver', word);
  });

  socket.on('drawer', () => {
    console.log('random user requested');
    console.log('randomuserreq', players);
    io.emit('drawer', players[Math.floor(Math.random() * players.length)]);
  });

  socket.on('getUsers', () => {
    let user = Object.entries(players);
    console.log(user);
    io.emit('joined players', user);
  });

  socket.on('finishedPosition', () => {
    io.emit('finishedPosition');
  });

  socket.on('startPosition', () => {
    io.emit('startPosition');
  });
  socket.on('timer', (timer) => {
    io.emit('timer', timer);
  });
});

io.listen(3000);
