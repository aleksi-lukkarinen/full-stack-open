const config = require("../../utils/config")
const mongoose = require("mongoose")
const supertest = require("supertest")
const BF = require("../blog_fixture")
const _ = require("lodash")
const app = require("../../app")
const api = supertest(app)


afterAll(() => {
  mongoose.connection.close()
})

test("Blogs are returned as JSON", async () => {
  await api
    .get(config.URL_API_BLOGS)
    .expect(config.HTTP_STATUS_OK)
    .expect("Content-Type", /application\/json/)
})


describe("When blog collection is empty", () => {
  beforeEach(async () => { await BF.clearBlogCollection() })

  test("getting blogs results in an empty list", async () => {
    await BF.clearBlogCollection()
    const blogs = await BF.allBlogsFromCollectionUsingGET(api)
    expect(blogs).toHaveLength(0)
  })
})


describe("When blog collection contains one entry", () => {
  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
  })

  test("only one entry returned", async () => {
    const blogs = await BF.allBlogsFromCollectionUsingGET(api)
    expect(blogs).toHaveLength(1)
  })
})


describe("A blog entry returned from the collection", () => {
  let entryKeys = undefined

  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    const blogs = await BF.allBlogsFromCollectionUsingGET(api)
    entryKeys = _.keys(blogs[0])
  })

  test("has a property \"id\"", async () => {
    expect(entryKeys).toContain("id")
  })

  test("does not have a property \"_id\"", async () => {
    expect(entryKeys).not.toContain("_id")
  })

  test("does not have a property \"__v\"", async () => {
    expect(entryKeys).not.toContain("__v")
  })
})


describe("When blog collection contains several entries", () => {
  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertAllTestBlogsToCollection()
  })

  test("all the blogs in the collection are returned", async () => {
    const blogs = await BF.allBlogsFromCollectionUsingGET(api)
    expect(blogs).toHaveLength(BF.NUMBER_OF_TEST_BLOGS)
  })
})
