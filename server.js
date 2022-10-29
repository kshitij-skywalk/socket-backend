const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const app = require(path.join(__dirname, "app"));
require("dotenv").config({ path: path.join(__dirname, "config.env") });

// const server = app.listen(process.env.PORT, () => {
//   console.log(`server started successfully on ${process.env.PORT}`);
// });
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    credentials: true,
    methods: ["GET", "POST"],
    transports: ["websocket"],
  },
  allowEIO3: true,
});

io.on("connection", (sock) => {
  sock.on("joinMe", (data) => {
    // sock.emit("new_msg", `HELLO USER ${data}`);
    console.log("connected");
    sock.join(data.email); // We are using room of socket io
  });
  setTimeout(() => {
    console.log("user");
    io.sockets
      .in("user1@example.com")
      .emit("new_msg", { msg: `hello ${"USER"}` });
  }, 5000);
});
server.listen(process.env.PORT, () => {
  console.log(`server started successfully on ${process.env.PORT}`);
});
