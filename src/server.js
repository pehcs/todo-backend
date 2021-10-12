import express from "express";
import router from "./routes.js";
import db from './database.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config()
const server = express();
const resetDb = false

db.sync({force: resetDb, logging: false})

server.use(cookieParser())
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(router);

server.listen(3000, () => {
  console.log("listening on port:", 3000);
});
