import * as CREF from "./cref";
import Educator from "./educator";

const Mock_CREF_Validator = (): CREF.Validator => {
  return {
    valid: jest.fn(),
  };
};

describe("Educator testing", () => {
  it("should create a new educator", async () => {
    const crefValidator = Mock_CREF_Validator();
    crefValidator.valid = jest.fn().mockResolvedValue(true);
    const factory = new Educator.Factory(crefValidator);

    const educator = await factory.build("Diego", "209202011", []);
    expect(educator.name).toBe("Diego");
    expect(educator.cref).toBe("209202011");
    expect(educator.pacients).toStrictEqual([]);
  });

  it("shouldnt create a new educator when CREF is invalid", async () => {
    const crefValidator = Mock_CREF_Validator();
    crefValidator.valid = jest.fn().mockResolvedValue(false);
    const factory = new Educator.Factory(crefValidator);

    expect(() => factory.build("Diego", "209202011", [])).rejects.toThrowError(
      ""
    );
  });
});
