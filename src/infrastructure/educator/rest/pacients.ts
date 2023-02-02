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
      const body = request.body;
      const input: Params = {
        educatorId: request.params.educator,
        name: body.name,
        cpf: body.cpf,
        height: body.height,
        weight: body.weight,
        birthday: new Date(body.birthday),
      };

      const pacient = await this.registerPacient.execute(input);
      logger.info(`Success on register pacient name: ${body.name}`);
      response.status(httpStatusCodes.CREATED).send(pacient);
    } catch (error) {
      if (error instanceof ApplicationError) {
        logger.error(`Error on register pacient name: ${request.body.name}`);
        response
          .status(httpStatusCodes.BAD_REQUEST)
          .send({ errors: error.errors });
        return;
      }
      logger.error(
        `Unexpected error on register pacient name: ${request.body.name}`
      );
      response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}
