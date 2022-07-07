// importing the main packages...
import express from 'express';
import colors from 'colors';
import KellyWorld from './src/Client.js';

// we define one of Kelly's main variables...
const client = new KellyWorld();
const app = express();
client.start();

// complement for the bot not to shut down with beast errors...
const trainerror = (error) => {
  if (error.toString().includes('Missing Permissions') || error.toString().includes('Missing acess')) return;
  console.error(colors.brightRed("[Info] - ") + error.stack); 
};

// what will be on the main page...
app.get("/", (req, res) => {
  res.render("home");
});

// site of the bot that will be in the application
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.set("view engine", "ejs");

// port that the web server will start
app.listen(process.env.PORT || 8080, (req, res) =>
  console.log(colors.brightGreen("[Info] - ") + `Web Server connected to port: 8080`)
);

// prevent the bot from turning off if there is an error...
global.process.on('unhandledRejection', trainerror);
global.process.on('uncaughtException', trainerror);

// exporting the client...
export default client;