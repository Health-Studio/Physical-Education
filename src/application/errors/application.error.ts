import NotificationError from "@src/domain/commons/notification/notification.error";

export class ApplicationError extends Error {
  private static withErrors(message: string, errors: { context: string; errors: string[] }[]): string{
    const messages = errors.map(
      (m) => `:\n${m.context}:\n${m.errors.map((e) => `\t${e}\n`)}`
    );

    return message +
      (messages.length == 0 ? "" : messages.reduce((v, acc) => acc + v));
  }

  private static withError(message: string, error: string): string{
    return `${message}:\n\t${error}`
  }

  public constructor(
    public message: string,
    public errors: { context: string; errors: string[] }[],
    public error: string,
  ) {
    super(errors.length == 0 ? ApplicationError.withError(message, error) : ApplicationError.withErrors(message,errors));

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public static fromNotification(
    notification: NotificationError
  ): ApplicationError {
    const errors = notification.errors.map((e) => ({
      context: e.context,
      errors: e.message.split(","),
    }));

    return new ApplicationError("Domain Error(s)", errors, "");
  }

  public static fromError(error: Error): ApplicationError {
    return new ApplicationError("Application Error", [], error.message);
  }
}
