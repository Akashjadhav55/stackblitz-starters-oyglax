let { app } = require("../index.js")
let { getArticles, getArticleById, getComments,getCommentById, getUserById } = require("../data.js") 

let request = require("supertest")
let http = require("http")
const { describe } = require("node:test")

jest.mock("../data.js", () => ({
  ...jest.requireActual("../data.js"),
  getArticles : jest.fn(),
  getArticleById: jest.fn(),
  getComments: jest.fn(),
  getCommentById:  jest.fn(),
  getUserById:  jest.fn(),
}))

let server;

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3010,done)
})

afterAll((done) => {
  server.close(done)
})

describe("API Testing",() => {
  test("GET API /articles should return 404 if no articles are found", async () => {
    getArticles.mockResolvedValue([])

    let res = await request(server).get("/articles")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("No articles found")
  })

  test("GET API /articles/999 should return non-existing Id of article", async () => {
    getArticleById.mockResolvedValue(null)

    let res = await request(server).get("/articles/999")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("Article not found")
  })

  test("GET API /comments should return 404 if articles not found", async () =>{
    getComments.mockResolvedValue([])

    let res = await request(server).get("/comments")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("No comments found")
  })

  test("GET API /comments/999 should return non-existing id of comment", async () => {
    getComments.mockResolvedValue(null)

    let res = await request(server).get("/comments/999")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("Comment not found")
  })

  test("GET API /users/999 should return non-existing id", async () => {
    getUserById.mockResolvedValue(null)

    let res = await request(server).get("/users/999")
    expect(res.status).toBe(404)
    expect(res.body.error).toBe("User not found")
  })
})