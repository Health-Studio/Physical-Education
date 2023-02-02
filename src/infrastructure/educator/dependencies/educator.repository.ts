import { PrismaClient } from "@prisma/client";
import PrismaRepository from "../repository/prisma.repository";

const repository = (client: PrismaClient) => {
  return new PrismaRepository(client);
};

export default repository;
