import { Notification } from "./notification";

describe("Domain commons: Notification tests", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "context",
    };

    notification.addError(error);
    expect(notification.messages("context")).toBe("context: error message");

    let other = {
      message: "error message",
      context: "context",
    };

    notification.addError(other);
    expect(notification.messages("context")).toBe(
      "context: error message, context: error message"
    );

    other = {
      message: "error message",
      context: "customer",
    };
    notification.addError(other);
    expect(notification.messages("customer")).toBe("customer: error message");

    expect(notification.messages()).toBe(
      "context: error message, context: error message, customer: error message"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "context",
    };

    notification.addError(error);
    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "context",
    };

    const other = {
      message: "error message",
      context: "other",
    };
    notification.addError(error);
    notification.addError(other);

    expect(notification.Errors).toEqual([error, other]);
  });
});
