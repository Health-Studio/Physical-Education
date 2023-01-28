import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost"

app.get("/health", (_: Request, response: Response) => {
    response.status(200).send();
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`)
});