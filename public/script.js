const socket = io('/');

socket.emit('join-room', ROOM_ID, 20);

socket.on('user-connected', (usreId) => {
  console.log(`User connected: ${usreId}`)
})
