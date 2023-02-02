import Server from "./server";
import dotenv from "dotenv";
import logger from "./logger";

enum Status {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `Exiting due to an unhandled promise: ${promise} reason: ${reason}`
  );
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`Exiting due to an uncaught exception: ${error}`);
  process.exit(Status.Failure);
});

(async (): Promise<void> => {
  try {
    dotenv.config();
    process.env.LOG = "true";
    const port = process.env.PORT;
    const host = process.env.HOST;

    const server = new Server(host, port);
    server.init();

    const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    signals.map((signal) =>
      process.on(signal, async () => {
        try {
          await server.close();
          logger.info("Exited with success");
          process.exit(Status.Success);
        } catch (error) {
          logger.error(`Exited with error ${error}`);
          process.exit(Status.Failure);
        }
      })
    );
  } catch (error) {
    logger.error(`Exited with error ${error}`);
    process.exit(Status.Failure);
  }
})();
