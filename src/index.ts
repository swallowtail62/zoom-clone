import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = new http.Server(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = Number(process.env.PORT) || 7000;
server.listen(port);
