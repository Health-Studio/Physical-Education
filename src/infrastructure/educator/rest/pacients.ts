import { Controller, Post } from "@overnightjs/core";
import RegisterPacient, {
  Params,
} from "@src/application/educator/register.pacient";
import { ApplicationError } from "@src/application/errors/application.error";
import logger from "@src/logger";
import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";

@Controller("api/pacients")
export default class PacientsController {
  private readonly registerPacient: RegisterPacient;

  constructor(registerPacient: RegisterPacient) {
    this.registerPacient = registerPacient;
  }

  @Post(":educator")
  public async create(request: Request, response: Response) {
    try {
      const educatorId = request.params.educator;
      const body = request.body;
      const input: Params = {
        educatorId: educatorId,
        name: body.name,
        cpf: body.cpf,
        height: body.height,
        weight: body.weight,
        birthday: new Date(body.birthday),
      };

      const pacient = await this.registerPacient.execute(input);
      logger.info(
        `Success on register pacient name: "${body.name}" educator: "${educatorId}"`
      );
      response.status(httpStatusCodes.CREATED).send(pacient);
    } catch (err) {
      const error = err as ApplicationError;
      error.Errors.forEach((e) =>
        e.messages.forEach((message) => {
          logger.error(
            `Error on register pacient name: "${request.body.name}" context: "${e.context}" reason: "${message}"`
          );
        })
      );
      response
        .status(httpStatusCodes.BAD_REQUEST)
        .send({ errors: error.Errors });
      return;
    }
  }
}
