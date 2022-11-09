const { expect } = require("chai");
const request = require("supertest");
const { db, Cheese } = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Cheeses routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/cheeses/", () => {
    it("GET /api/cheeses", async () => {
      const res = await request(app).get("/api/cheeses").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(10);
    });
  }); // end describe('/api/cheeses')
}); // end describe('Cheeses routes')
