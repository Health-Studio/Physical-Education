import NotificationError from "@src/domain/commons/notification/notification.error";
import { Factory, Repository } from "@src/domain/educator/educator";
import { ApplicationError } from "../errors/application.error";

export interface Params {
  name: string;
  cref: string;
}

export interface CreatedEducator {
  id: string;
  name: string;
}

export class CreateEducator {
  private readonly factory: Factory;
  private readonly repository: Repository;

  constructor(factory: Factory, repository: Repository) {
    this.factory = factory;
    this.repository = repository;
  }

  public async execute(params: Params): Promise<CreatedEducator> {
    try {
      const educator = await this.factory.build(params.name, params.cref, []);

      const exists =
        (await this.repository.findByCREF(educator.CREF)) === null
          ? false
          : true;

      if (exists) throw new Error("educator already exists");

      await this.repository.create(educator);
      return {
        id: educator.Id,
        name: educator.Name,
      };
    } catch (error) {
      if (error instanceof NotificationError)
        throw ApplicationError.fromNotification(error);
      throw ApplicationError.fromError("create educator", error as Error);
    }
  }
}
