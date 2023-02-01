export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  public addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  public messages(context?: string): string {
    return this.errors
      .filter((e) => e.context == context || context == null)
      .map((e) => `${e.context}: ${e.message}`)
      .join(", ");
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public get Errors(): NotificationErrorProps[] {
    return this.errors;
  }
}
