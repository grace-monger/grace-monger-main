const { expect } = require("chai");
const request = require("supertest");
const { db, Wine } = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Wines routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/wines/", () => {
    it("GET /api/wines", async () => {
      const res = await request(app).get("/api/wines").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(10);
    });
  }); // end describe('/api/wines')
}); // end describe('wines routes')
