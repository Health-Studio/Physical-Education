import Server from "@src/server";
import supertest from "supertest";

let server: Server;

beforeAll(() => {
  server = new Server();
  server.init();
  global.Test = {
    request: supertest(server.Application),
  };
});

beforeEach(async () => {
  await server.Database.circumference.deleteMany();
  await server.Database.skinFold.deleteMany();
  await server.Database.pacient.deleteMany();
  await server.Database.educator.deleteMany();
});

afterAll(async () => {
  await server.close();
});
