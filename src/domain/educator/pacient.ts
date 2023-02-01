import Entity from "../commons/entity/entity.abstract";
import NotificationError from "../commons/notification/notification.error";

export class Pacient extends Entity {
  protected cpf: string;
  protected name: string;
  protected birthday: Date;
  protected height: number;
  protected weight: number;

  private validate(): void {
    this.cpf = this.cpf.replaceAll("-", "");
    this.cpf = this.cpf.replaceAll(".", "");
    if (this.cpf.length != 11) {
      this.Notification.addError({
        context: "cpf",
        message: "value must be contains 11 digits",
      });
    }

    this.name = this.name.replaceAll(" ", "");
    if (this.name.length < 3 || this.name.length > 50) {
      this.Notification.addError({
        context: "name",
        message: "lenght must be greater than 3 and less than 50",
      });
    }

    if (this.birthday.getTime() >= new Date().getTime()) {
      this.Notification.addError({
        context: "birthday",
        message: "must be before today",
      });
    }

    if (this.height < 120 || this.height >= 250) {
      this.Notification.addError({
        context: "height",
        message: "value must be greaten than 120cm and less than 250cm",
      });
    }

    if (this.weight < 10 || this.weight >= 240) {
      this.Notification.addError({
        context: "weight",
        message: "value must be greater than 10kg and less than 240kg",
      });
    }

    if (this.Notification.hasErrors()) {
      throw new NotificationError(this.Notification.Errors);
    }
  }

  constructor(
    cpf: string,
    name: string,
    birthday: Date,
    height: number,
    weight: number,
    id?: string
  ) {
    super(id);
    this.cpf = cpf;
    this.name = name;
    this.birthday = birthday;
    this.height = height;
    this.weight = weight;
    this.validate();
  }

  public imc(): number {
    return Math.floor((this.weight / (this.height / 100) ** 2) * 100) / 100;
  }

  public age(): number {
    return new Date().getFullYear() - this.birthday.getFullYear();
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get CPF() {
    return this.cpf;
  }

  get Height() {
    return this.height;
  }

  get Weight() {
    return this.weight;
  }
}
