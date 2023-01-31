import { Server as Overnight } from "@overnightjs/core";
import { Response, Application } from "express";
import bodyParser from "body-parser";
import * as http from "http";

export class Server extends Overnight {
  private server?: http.Server

  constructor(private host = "localhost", private port = "8080") {
    super();
    this.port = port;
  }

  public init(): void {
    this.setup();
    this.listen();
  }

  private setup(): void {
    this.app.use(bodyParser.json());
    this.app.get("/health", (_, response: Response) => {
      response.status(200).send({});
    });
  }

  private listen(): void{
    this.server = this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://${this.host}:${this.port}`);
    })
  }

  public async close(): Promise<void> {
    if(this.server){
      await new Promise((resolve, reject) => {
        this.server?.close((err) => { if(err) return reject(err); resolve(true)})
      })
    }
  }

  public get application(): Application {
    return this.app;
  }
}
