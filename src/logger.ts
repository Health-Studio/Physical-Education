import pino from "pino";

export default pino({
  enabled: process.env.LOG === "true",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: "info",
});
