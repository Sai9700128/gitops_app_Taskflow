const request = require("supertest");
const app = require("./index");

describe("markdown-service", () => {
  test("GET /health returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });

  test("GET /render returns 200", async () => {
    const res = await request(app).get("/render");
    expect(res.statusCode).toBe(200);
  });
});
