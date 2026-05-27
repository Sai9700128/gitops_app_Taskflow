const request = require("supertest");
const app = require("./index");

describe("realtime-service", () => {
  test("GET /health returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });

  test("GET /connections returns 200", async () => {
    const res = await request(app).get("/connections");
    expect(res.statusCode).toBe(200);
  });
});
