import NotificationError from "../commons/notification/notification.error";
import * as CREF from "./cref";
import { Educator, Factory } from "./educator";

const validator = (): CREF.Validator => {
  return {
    valid: jest.fn(),
  };
};

describe("Domain educator: Educator behaivors and functions", () => {
  it("should create a new educator", async () => {
    const crefValidator = validator();
    crefValidator.valid = jest.fn().mockResolvedValue(true);
    const factory = new Factory(crefValidator);

    const educator: Educator = await factory.build("Diego", "20920201122", []);
    expect(educator.Name).toBe("Diego");
    expect(educator.CREF).toBe("20920201122");
    expect(educator.Pacients).toStrictEqual([]);
  });

  it("shouldnt create a new educator when name lenght is invalid", async () => {
    const crefValidator = validator();
    crefValidator.valid = jest.fn().mockResolvedValue(true);
    const factory = new Factory(crefValidator);

    expect(() => factory.build("Di", "20920201122", [])).rejects.toThrow(
      NotificationError
    );
  });

  it("shouldnt create a new educator when CREF lenght is invalid", async () => {
    const crefValidator = validator();
    crefValidator.valid = jest.fn().mockResolvedValue(true);
    const factory = new Factory(crefValidator);

    expect(() => factory.build("Diego", "209202011", [])).rejects.toThrow(
      NotificationError
    );
  });

  it("shouldnt create a new educator when CREF is invalid", async () => {
    const crefValidator = validator();
    crefValidator.valid = jest.fn().mockResolvedValue(false);
    const factory = new Factory(crefValidator);

    expect(() => factory.build("Diego", "209202011", [])).rejects.toThrow(
      NotificationError
    );
  });
});
