const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:8080",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection: ", socket.id);

  // listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      // push new connected users
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    // console.log("onlineUser : ", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (data) => {
    console.log("sendMessage : ", data);

    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Find the user with the matching socketId and remove it from the onlineUsers array
    const disconnectedUserIndex = onlineUsers.findIndex(
      (user) => user.socketId === socket.id
    );

    if (disconnectedUserIndex !== -1) {
      onlineUsers.splice(disconnectedUserIndex, 1);
    }

    // Send updated online users list to all clients
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
