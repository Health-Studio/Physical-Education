import NotificationError from "../commons/notification/notification.error";
import * as CREF from "./cref";
import { Educator, Factory } from "./educator";
import { Pacient } from "./pacient";

const validator = (): CREF.Validator => {
  return {
    valid: jest.fn(),
  };
};

describe("Domain educator: Educator behaivors and functions", () => {
  describe("Create a new educator tests", () => {
    it("should create a new educator", async () => {
      const crefValidator = validator();
      crefValidator.valid = jest.fn().mockResolvedValue(true);
      const factory = new Factory(crefValidator);

      const educator: Educator = await factory.build(
        "Diego",
        "20920201122",
        []
      );
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

      expect(() => factory.build("Diego", "20920201122", [])).rejects.toThrow(
        NotificationError
      );
    });
  });

  describe("Add pacients to educator treat tests", () => {
    const pacient = new Pacient(
      "000.000.000-00",
      "Guilherme",
      new Date(2000, 12, 12),
      180,
      97,
      "added"
    );

    it("should add new pacient when he isnt educator pacient", async () => {
      const crefValidator = validator();
      crefValidator.valid = jest.fn().mockResolvedValue(true);
      const factory = new Factory(crefValidator);

      const educator = await factory.build("Diego", "20920201122", []);
      educator.add(pacient);

      expect(educator.Pacients.length).toBe(1);
      expect(educator.Pacients).toStrictEqual([pacient]);
    });

    it("shouldnt add new pacient when he is educator pacient", async () => {
      const crefValidator = validator();
      crefValidator.valid = jest.fn().mockResolvedValue(true);
      const factory = new Factory(crefValidator);

      const educator = await factory.build("Diego", "20920201122", [pacient]);
      educator.add(pacient);

      expect(educator.Pacients.length).toBe(1);
      expect(educator.Pacients).toStrictEqual([pacient]);
    });
  });
});
