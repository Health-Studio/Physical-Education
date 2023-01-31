import { Server } from "@src/server";
import supertest from "supertest";

let server: Server

beforeAll(() => {
    server = new Server();
    server.init();
    global.Test = {
        request: supertest(server.application)
    }
});

afterAll(async () => {
    await server.close();
})