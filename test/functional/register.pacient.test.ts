describe("Pacients routes", () => {
  it("should return status 201 created when pacient was created", async () => {
    const createEducator = { name: "Diego", cref: "1234567890" };
    let { body, status } = await global.Test.request
      .post("/api/educators")
      .send(createEducator)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.id).not.toBeNull();
    expect(body.name).not.toBeNull();
    expect(status).toBe(201);

    const educatorId = body.id;

    const createPacient = {
      name: "Cesar",
      cpf: "000.000.000-00",
      height: 180,
      weight: 87,
      birthday: "12/12/2000",
    };
    const response = await global.Test.request
      .post(`/api/pacients/${educatorId}`)
      .send(createPacient)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    body = response.body;
    status = response.status;
    expect(body.id).not.toBeNull();
    expect(body.name).not.toBeNull();
    expect(status).toBe(201);
  });

  it("should return status 400 bad request when pacient is invalid", async () => {
    const createEducator = { name: "Diego", cref: "1234567890" };
    let { body, status } = await global.Test.request
      .post("/api/educators")
      .send(createEducator)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.id).not.toBeNull();
    expect(body.name).not.toBeNull();
    expect(status).toBe(201);

    const educatorId = body.id;

    const createPacient = {
      name: "Ce",
      cpf: "000.000.000-00",
      height: 180,
      weight: 87,
      birthday: "12/12/2000",
    };
    const response = await global.Test.request
      .post(`/api/pacients/${educatorId}`)
      .send(createPacient)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    body = response.body;
    status = response.status;
    expect(body.errors).not.toBeNull();
    expect(status).toBe(400);
  });

  it("should return status 400 bad request when educator not exists", async () => {
    const createPacient = {
      name: "Cesar",
      cpf: "000.000.000-00",
      height: 180,
      weight: 87,
      birthday: "12/12/2000",
    };
    const { body, status } = await global.Test.request
      .post(`/api/pacients/unregistered-educator`)
      .send(createPacient)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(body.errors).not.toBeNull();
    expect(status).toBe(400);
  });
});
