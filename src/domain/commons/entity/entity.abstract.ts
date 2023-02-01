import { v4 as uuid } from "uuid";
import { Notification } from "../notification/notification";

export default abstract class Entity {
  protected id: string;
  protected notification: Notification;

  constructor(id?: string) {
    this.id = id === undefined ? uuid() : id;
    this.notification = new Notification();
  }

  get Id(): string {
    return this.id;
  }

  get Notification(): Notification {
    return this.notification;
  }
}
