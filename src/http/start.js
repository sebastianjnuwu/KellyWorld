import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import colors from 'colors';
import cors from 'cors';
const http = express();
const web = createServer(http);

http.get('*', (req, res) => {
  res.send("I don't know how to read anything...");
});

const io = new Server(web, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

web.listen(8080, () => console.log(colors.brightGreen('• ') + 'http started on port 8080...'));