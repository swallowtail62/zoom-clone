import express from "express";
import { Server } from "http";

const app = express();
const http = new Server(app);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = Number(process.env.PORT) || 7000;
http.listen(port);
