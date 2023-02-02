import NotificationError from "@src/domain/commons/notification/notification.error";
import { ApplicationError } from "../errors/application.error";
import { Repository } from "@src/domain/educator/educator";
import { Pacient } from "@src/domain/educator/pacient";

export interface Params {
  educatorId: string;
  name: string;
  cpf: string;
  height: number;
  weight: number;
  birthday: Date;
}

export interface AttendedPacient {
  id: string;
  name: string;
  height: number;
  weight: number;
  age: number;
  imc: number;
}

export default class RegisterPacient {
  private readonly repository: Repository;

  public constructor(repository: Repository) {
    this.repository = repository;
  }

  public async execute(params: Params): Promise<AttendedPacient> {
    try {
      const educator = await this.repository.findById(params.educatorId);
      if (educator === null) throw new Error("educator not found");

      const quantityOfPacients = educator.Pacients.length;
      const pacient = new Pacient(
        params.cpf,
        params.name,
        params.birthday,
        params.height,
        params.weight
      );

      educator.add(pacient);

      if (quantityOfPacients != educator.Pacients.length)
        await this.repository.update(educator);

      return {
        id: pacient.Id,
        name: pacient.Name,
        height: pacient.Height,
        weight: pacient.Weight,
        age: pacient.age(),
        imc: pacient.imc(),
      };
    } catch (error) {
      if (error instanceof NotificationError)
        throw ApplicationError.fromNotification(error);
      throw ApplicationError.fromError(error as Error);
    }
  }
}
