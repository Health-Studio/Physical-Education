import { ApplicationError } from "../errors/application.error";
import { Educator, Repository } from "@src/domain/educator/educator";
import RegisterPacient, { Params } from "./register.pacient";
import { Pacient } from "@src/domain/educator/pacient";

const repository: Repository = {
  findByCREF: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
};

const validInput: Params = {
  educatorId: "educator",
  name: "Cesar",
  cpf: "000.000.000-00",
  height: 180,
  weight: 87,
  birthday: new Date(2000, 12, 12),
};

const invalidInput: Params = {
  educatorId: "educator",
  name: "Ju",
  cpf: "000.000.000-00",
  height: 180,
  weight: 87,
  birthday: new Date(2000, 12, 12),
};

describe("Application services: Register pacient testing", () => {
  const service = new RegisterPacient(repository);

  it("should register a new pacient", async () => {
    repository.findById = jest
      .fn()
      .mockResolvedValue(new Educator("Diego", "1234569018", []));

    const output = await service.execute(validInput);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(validInput.educatorId);
    expect(repository.update).toBeCalledTimes(1);
    expect(output.name).toBe(validInput.name);
    expect(output.height).toBe(output.height);
    expect(output.weight).toBe(output.weight);
  });

  it("shouldnt register a new pacient when he is invalid", async () => {
    repository.findById = jest
      .fn()
      .mockResolvedValue(new Educator("Diego", "1234569018", []));

    expect(() => service.execute(invalidInput)).rejects.toThrow(
      ApplicationError
    );

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(validInput.educatorId);
    expect(repository.update).toBeCalledTimes(0);
  });

  it("shouldnt register a new pacient when he belongs to educator", async () => {
    repository.findById = jest
      .fn()
      .mockResolvedValue(
        new Educator("Diego", "1234569018", [
          new Pacient(
            validInput.cpf,
            validInput.name,
            validInput.birthday,
            validInput.height,
            validInput.height,
            "pacient"
          ),
        ])
      );

    await service.execute(validInput);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(validInput.educatorId);
    expect(repository.update).toBeCalledTimes(0);
  });

  it("shouldnt register pacient when educator not exists", async () => {
    repository.findById = jest.fn().mockResolvedValue(null);
    expect(() => service.execute(validInput)).rejects.toThrow(ApplicationError);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(validInput.educatorId);
    expect(repository.update).toBeCalledTimes(0);
  });
});
