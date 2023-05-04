import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import pkg from 'body-parser';
import dotenv from 'dotenv';
import { connectToDB, closeDBConnection } from './utils/db.mjs';
import { users , watchlist } from "./data/index.js"
import { getIMDbDb } from "./utils/db.mjs";
import { addToWatchlist, removeFromWatchlist, getUserWatchlist } from './controllers/watchlist.js';
import { getUser, getAllUsers, updateUserPass, deleteUser, updateUser, getUserbyName, updatePicture, updateBackground} from "./controllers/user.js";
import { login, logout, register } from "./controllers/auth.js";
import { addUpdateRating, getUserRatings, ratingStatistics } from "./controllers/ratings.js";
import { searchTitle, searchTitles } from "./controllers/search.js";
import { getRecentlyViewed } from "./controllers/recentlyViewed.js";
import { userList } from "./controllers/userList.js";
import { addFriend, removeFriend, getFriends } from "./controllers/friends.js";
import cors from 'cors';
import multer from "multer";
import axios from "axios";

// Initializing
const app = express();
app.use(cors());
const port = 3000;
const { json } = pkg;
const db = await getIMDbDb();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use('/uploads', express.static('uploads'));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// commands to connect to the server and add one time user and watchlist data
var server;

async function createServer(){
  try {
    await connectToDB();
    // resource paths
    app.get('/users/:email',getUser);
    app.get('/search/user/:firstName',getUserbyName);
    app.put('/users/update/:email',updateUserPass);
    app.put('/users/:email', updateUser);
    app.put('/users/picture/:email', upload.single("file"), updatePicture);
    app.put('/users/background/:email', upload.single("file"), updateBackground);
    app.delete('/users/:email', deleteUser);
    app.post('/register', register);
    app.post('/login', login);
    app.post('/logout', logout);
    app.get('/search/:primaryTitle/:email',searchTitle);
    app.get('/search/:primaryTitle', searchTitles);
    //app.get('/search/date/:Date',searchTitleByDate);
    app.post('/watchlist', addToWatchlist);
    app.delete('/watchlist/:email', removeFromWatchlist);
    app.get('/watchlist/:email', getUserWatchlist);
    app.post('/rating', addUpdateRating);
    app.get('/rating/:email',getUserRatings);
    app.get('/rating/stats/:tconst', ratingStatistics);
    app.get('/rating/:email', getUserRatings);
    app.get('/recent/:email', getRecentlyViewed);
    app.post('/userList', userList);
    app.post('/friends/:email', addFriend);
    app.delete('/friends/:email', removeFriend);
    app.get('/friends/:email', getFriends);
    // start the server
    server = app.listen(port, () => {
      console.log('Example app listening at http://localhost:%d', port);
    /* add one time data */
    //User.insertMany(users);
    });
  }catch(err){
    console.log(err)
  }
}
createServer();

// code to kill the server
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await closeDBConnection()   ;
    console.log(msg);
  });
});

