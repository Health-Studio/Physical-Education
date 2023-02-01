import each from "jest-each";
import { Pacient } from "./pacient";
import NotificationError from "../commons/notification/notification.error";

const invalidHeights = [0, 10, 119, 250, 251];
const invalidWeights = [0, -1, 9, 240, 241];
const invalidCPFs = ["...........", "123456789101", "11.22.344.11"];
const invalidNames = ["Li", "   "];

const validHeight = 180;
const validWeight = 100;
const validCPF = "123.456.789-10";
const validName = "Diego";
const actualYear = new Date().getFullYear();
const validAge = 18;
const validBirthday = new Date(actualYear - validAge, 1);

describe("Domain pacient: Pacient behaivors and functions", () => {
  it("should create a new pacient", async () => {
    const pacient: Pacient = new Pacient(
      validCPF,
      validName,
      validBirthday,
      validHeight,
      validWeight
    );
    expect(pacient.Id).not.toBeNull();
    expect(pacient.Name).toBe(validName);
    expect(pacient.CPF).toBe(validCPF.replaceAll(".", "").replaceAll("-", ""));
    expect(pacient.Height).toBe(validHeight);
    expect(pacient.Weight).toBe(validWeight);
    expect(pacient.age()).toBe(18);
    expect(pacient.imc()).toBe(30.86);
  });

  each(invalidNames).test(
    "shouldnt create a new pacient when name lenght is invalid",
    (name) => {
      expect(
        () =>
          new Pacient(validCPF, name, validBirthday, validHeight, validWeight)
      ).toThrowError(NotificationError);
    }
  );

  each(invalidCPFs).test(
    "shouldnt create a new pacient when CPF lenght is invalid",
    (cpf) => {
      expect(
        () =>
          new Pacient(cpf, validName, validBirthday, validHeight, validWeight)
      ).toThrow(NotificationError);
    }
  );

  each(invalidHeights).test(
    "shouldnt create a new pacient when height is invalid",
    (height) => {
      expect(
        () =>
          new Pacient(validCPF, validName, validBirthday, height, validWeight)
      ).toThrow(NotificationError);
    }
  );

  each(invalidWeights).test(
    "shouldnt create a new pacient when weight is invalid",
    (weight) => {
      expect(
        () =>
          new Pacient(validCPF, validName, validBirthday, validHeight, weight)
      ).toThrow(NotificationError);
    }
  );

  it("shouldnt create a new pacient when birthday is invalid", () => {
    expect(
      () =>
        new Pacient(validCPF, validName, new Date(), validHeight, validWeight)
    ).toThrow(NotificationError);
  });
});
