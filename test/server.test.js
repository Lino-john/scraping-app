const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../server/app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Scraping API", () => {
  after(() => {
    server.close();
  });

  it("should scrape the website and return JSON results", async () => {
    const res = await chai.request(app).get("/api/scrape");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("results").that.is.an("array");
  });
});
