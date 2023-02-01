import { Factory, Repository } from "@src/domain/educator/educator";
import * as CREF from "@src/domain/educator/cref";
import { CreateEducator } from "./create.educator";
import { ApplicationError } from "../errors/application.error";

const repository: Repository = {
  findByCREF: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
};

const validator: CREF.Validator = {
  valid: jest.fn(),
};

const factory: Factory = new Factory(validator);

describe("Application services: Create educator testing", () => {
  const service = new CreateEducator(factory, repository);

  it("should create a new educator", async () => {
    validator.valid = jest.fn().mockResolvedValue(true);
    repository.findByCREF = jest.fn().mockResolvedValue(null);

    const input = { name: "Diego", cref: "1123456775" };
    const output = await service.execute(input);

    expect(output.id).not.toBeNull();
    expect(output.name).toBe(input.name);
  });

  it("shouldnt create a new educator when already exists", async () => {
    validator.valid = jest.fn().mockResolvedValue(true);
    const educator = await factory.build("Diego", "1123456775", []);
    repository.findByCREF = jest.fn().mockResolvedValue(educator);

    const input = { name: "Diego", cref: "1123456775" };
    expect(() => service.execute(input)).rejects.toThrow(ApplicationError);
  });

  it("shouldnt create a new educator when name is invalid", async () => {
    validator.valid = jest.fn().mockResolvedValue(true);
    repository.findByCREF = jest.fn().mockResolvedValue(null);

    const input = { name: "Di", cref: "1123456775" };
    expect(() => service.execute(input)).rejects.toThrow(ApplicationError);
  });

  it("shouldnt create a new educator when cref is invalid", async () => {
    const input = { name: "Diego", cref: "123456775" };
    expect(() => service.execute(input)).rejects.toThrow(ApplicationError);

    validator.valid = jest.fn().mockResolvedValue(false);
    expect(() => service.execute(input)).rejects.toThrow(ApplicationError);
  });
});
