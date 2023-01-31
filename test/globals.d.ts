declare global {
    //eslint-disable-next-line no-var
    var Test : {
        request: import("supertest").SuperTest<import("supertest").Request>;
    }
}

export {};