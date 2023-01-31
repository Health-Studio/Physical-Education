import { Server } from "./server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

const server = new Server(host, port);
server.init();
