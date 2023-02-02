import NotificationError from "@src/domain/commons/notification/notification.error";

type AppError = { context: string; messages: string[] };

export class ApplicationError extends Error {
  constructor(protected layer: string, protected errors: AppError[]) {
    super(layer);
    this.layer = layer;
    this.errors = errors;
  }

  public static fromNotification(
    notification: NotificationError
  ): ApplicationError {
    const errors = notification.errors.map((e) => ({
      context: e.context,
      messages: e.message.split(","),
    }));

    return new ApplicationError("domain", errors);
  }

  public static fromError(context: string, error: Error): ApplicationError {
    const errors = [{ context, messages: [error.message] }];
    return new ApplicationError("application", errors);
  }

  public get Errors() {
    return this.errors;
  }
}
