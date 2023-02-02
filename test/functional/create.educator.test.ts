describe("Educator routes", () => {
  it("should return status 201 created when educator was created", async () => {
    const payload = { name: "Diego", cref: "1234567890" };
    const { body, status } = await global.Test.request
      .post("/api/educators")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.id).not.toBeNull();
    expect(body.name).not.toBeNull();
    expect(status).toBe(201);
  });

  it("should return status 400 bad request when educator is invalid", async () => {
    const payload = { name: "Di", cref: "1234567890" };
    const { body, status } = await global.Test.request
      .post("/api/educators")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.errors).not.toBeNull();
    expect(status).toBe(400);
  });

  it("should return status 400 bad request when educator already exists", async () => {
    const payload = { name: "Diedo", cref: "1234567890" };
    const { body, status } = await global.Test.request
      .post("/api/educators")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.id).not.toBeNull();
    expect(body.name).not.toBeNull();
    expect(status).toBe(201);

    const response = await global.Test.request
      .post("/api/educators")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.body.errors).not.toBeNull();
    expect(response.status).toBe(400);
  });
});
