const request = require("supertest");
const app = require("../app");

describe("Articles API", () => {
  it("should filter articles by search keyword", (done) => {
    request(app)
      .get("/api/articles?search=COVID")
      .expect(200)
      .expect((res) => {
        if (!res.body.articles.some((article) => article.title.includes("COVID"))) {
          throw new Error("Search filter not working");
        }
      })
      .end(done);
  });

  it("should filter articles by year", (done) => {
    request(app)
      .get("/api/articles?year=2023")
      .expect(200)
      .expect((res) => {
        if (!res.body.articles.every((article) => article.year === 2023)) {
          throw new Error("Year filter not working");
        }
      })
      .end(done);
  });

  it("should filter articles by category", (done) => {
    request(app)
      .get("/api/articles?category=Public%20Health%20Policy")
      .expect(200)
      .expect((res) => {
        if (
          !res.body.articles.every(
            (article) => article.category === "Public Health"
          )
        ) {
          throw new Error("Category filter not working");
        }
      })
      .end(done);
  });

  it("should limit the number of articles returned", (done) => {
    request(app)
      .get("/api/articles?page=1&limit=2")
      .expect(200)
      .expect((res) => {
        if (res.body.articles.length > 2) {
          throw new Error("Pagination limit not working");
        }
      })
      .end(done);
  });

  it("should return no articles for unmatched filters", (done) => {
    request(app)
      .get("/api/articles?search=nonexistentkeyword")
      .expect(200)
      .expect((res) => {
        if (res.body.articles.length !== 0) {
          throw new Error("Unmatched filters should return no articles");
        }
      })
      .end(done);
  });


  it("should return 404 for non-existent routes", (done) => {
    request(app)
      .get("/non-existent-route")
      .expect(404, done);
  });
});
