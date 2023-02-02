import { Controller, Post } from "@overnightjs/core";
import {
  CreateEducator,
  Params,
} from "@src/application/educator/create.educator";
import { ApplicationError } from "@src/application/errors/application.error";
import logger from "@src/logger";
import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";

@Controller("api/educators")
export default class EducatorsController {
  private readonly createEducator: CreateEducator;

  constructor(createEducator: CreateEducator) {
    this.createEducator = createEducator;
  }

  @Post("")
  public async create(request: Request, response: Response): Promise<void> {
    try {
      const body = request.body;
      const input: Params = { name: body.name, cref: body.cref };
      const educator = await this.createEducator.execute(input);
      logger.info(
        `Success on create educator name: ${body.name} id: ${educator.id}`
      );
      response.status(httpStatusCodes.CREATED).send(educator);
    } catch (error) {
      if (error instanceof ApplicationError) {
        logger.error(error);
        logger.error(`Error on create educator name: ${request.body.name}`);
        response
          .status(httpStatusCodes.BAD_REQUEST)
          .send({ errors: error.errors });
        return;
      }
      logger.error(
        `Unexpected error on create educator name: ${request.body.name} `
      );
      response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}
