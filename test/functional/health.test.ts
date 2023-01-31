describe("Health route", () => {
    it("should return status 200 OK", async () => {
        const { body, status } = await global.Test.request.get("/health");
        expect(body).toStrictEqual({});
        expect(status).toBe(200);
    })
})