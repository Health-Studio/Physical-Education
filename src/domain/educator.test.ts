import Educator from "./educator";

describe("Educator testing", () => {
  it("should create a new educator", () => {
    const educator = new Educator("Diego", "209202011");
    expect(educator.name).toBe("Diego");
    expect(educator.cref).toBe("209202011");
  });
});
