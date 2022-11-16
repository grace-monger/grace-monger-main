/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Order, Order_Wine, Order_Cheese },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Order routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/orders/", () => {
    it("GET /api/orders", async () => {
      const res = await request(app).get("/api/orders").expect(200);

      expect(res.body).to.be.an("array");
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
