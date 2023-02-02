import { Server as Overnight } from "@overnightjs/core";
import { Response, Application } from "express";
import bodyParser from "body-parser";
import * as http from "http";
import EducatorsController from "./infrastructure/educator/rest/educator";
import { PrismaClient } from "@prisma/client";
import repository from "./infrastructure/educator/dependencies/educator.repository";
import { CreateEducator } from "./application/educator/create.educator";
import factory from "./infrastructure/educator/dependencies/educator.factory";
import logger from "./logger";
import PacientsController from "./infrastructure/educator/rest/pacients";
import RegisterPacient from "./application/educator/register.pacient";

export default class Server extends Overnight {
  private server?: http.Server;
  private database: PrismaClient;

  constructor(private host = "localhost", private port = "8080") {
    super();
    this.port = port;
    this.database = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }

  public async init(): Promise<void> {
    await this.database.$connect();
    await this.database.$disconnect();
    this.setup();
    this.controllers();
    this.listen();
  }

  private controllers(): void {
    const educatorFactory = factory;
    const educatorRepository = repository(this.database);
    const educator = new EducatorsController(
      new CreateEducator(educatorFactory, educatorRepository)
    );
    const pacient = new PacientsController(
      new RegisterPacient(educatorRepository)
    );
    this.addControllers([pacient, educator]);
  }

  private setup(): void {
    this.app.use(bodyParser.json());
    this.app.get("/health", (_, response: Response) => {
      response.status(200).send({});
    });
  }

  private listen(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server is running at http://${this.host}:${this.port}`);
    });
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });

      await this.database.$disconnect();
    }
  }

  public get Application(): Application {
    return this.app;
  }

  public get Database(): PrismaClient {
    return this.database;
  }
}
