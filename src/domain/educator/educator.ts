import * as CREF from "./cref";
import { Pacient } from "./pacient";
import Entity from "../commons/entity/entity.abstract";
import NotificationError from "../commons/notification/notification.error";

type Id = string;
type Name = string;
type CREF = CREF.CREF;
type Pacients = Pacient[];

export interface Repository {
  create(educator: Educator): Promise<void>;
  findById(id: Id): Promise<Educator | null>;
  findByCREF(cref: CREF): Promise<Educator | null>;
  update(educator: Educator): Promise<void>;
}

export class Educator extends Entity {
  private name: Name;
  private cref: CREF;
  private pacients: Pacients;

  private validate(): void {
    if (this.name.length < 3 || this.name.length > 50) {
      this.Notification.addError({
        context: "name",
        message: "lenght must be greater than 3 and less than 50",
      });
    }

    this.cref.replace(" ", "");
    if (
      this.cref.length == 0 ||
      this.cref.length < 10 ||
      this.cref.length >= 20
    ) {
      this.Notification.addError({
        context: "cref",
        message: "lenght must be greater than 10 and less than 20",
      });
    }

    if (this.Notification.hasErrors()) {
      throw new NotificationError(this.Notification.Errors);
    }
  }

  constructor(name: Name, cref: CREF, pacients: Pacients, id?: string) {
    super(id);
    this.name = name;
    this.cref = cref;
    this.pacients = pacients;
    this.validate();
  }

  get Name(): Name {
    return this.name;
  }

  get CREF(): CREF {
    return this.cref;
  }

  get Pacients(): Pacients {
    return this.pacients;
  }

  public add(pacient: Pacient): void {
    const added =
      this.pacients.filter((p) => p.Id == pacient.Id || p.CPF == pacient.CPF)
        .length != 0;
    if (!added) this.pacients.push(pacient);
  }
}

export class Factory {
  private validator: CREF.Validator;

  constructor(validator: CREF.Validator) {
    this.validator = validator;
  }

  public async build(
    name: Name,
    cref: CREF,
    pacients: Pacients
  ): Promise<Educator> {
    const educator = new Educator(name, cref, pacients);
    const crefIsValid = await this.validator.valid(
      educator.Name,
      educator.CREF
    );
    if (!crefIsValid) {
      throw new NotificationError([
        { context: "educator", message: "CREF is invalid" },
      ]);
    }
    return educator;
  }
}
