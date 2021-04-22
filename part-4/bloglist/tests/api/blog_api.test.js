const config = require("../../utils/config")
const mongoose = require("mongoose")
const BF = require("../blog_fixture")
const api = BF.supertestApi
const _ = require("lodash")


afterAll(() => {
  mongoose.connection.close()
})

test("Blogs are returned as JSON", async () => {
  await api
    .get(config.URL_API_BLOGS)
    .expect(config.HTTP_STATUS_OK)
    .expect("Content-Type", /application\/json/)
})


describe("When the blog collection is empty", () => {
  beforeEach(async () => { await BF.clearBlogCollection() })

  test("retrieving all blogs results in an empty list", async () => {
    await BF.clearBlogCollection()
    const blogs = await BF.allBlogsFromCollectionUsingGET()
    expect(blogs).toHaveLength(0)
  })
})


describe("When the blog collection contains one blog", () => {
  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
  })

  test("only one blog is returned", async () => {
    const blogs = await BF.allBlogsFromCollectionUsingGET()
    expect(blogs).toHaveLength(1)
  })
})


describe("A blog returned from the collection", () => {
  let entryKeys = undefined

  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    const blogs = await BF.allBlogsFromCollectionUsingGET()
    entryKeys = _.keys(blogs[0])
  })

  test("has a property called \"id\"", async () => {
    expect(entryKeys).toContain("id")
  })

  test("does not have a property called \"_id\"", async () => {
    expect(entryKeys).not.toContain("_id")
  })

  test("has a property called \"title\"", async () => {
    expect(entryKeys).toContain("title")
  })

  test("has a property called \"author\"", async () => {
    expect(entryKeys).toContain("author")
  })

  test("has a property called \"likes\"", async () => {
    expect(entryKeys).toContain("likes")
  })

  test("has a property called \"url\"", async () => {
    expect(entryKeys).toContain("url")
  })

  test("does not have a property called \"__v\"", async () => {
    expect(entryKeys).not.toContain("__v")
  })
})


describe("When the blog collection contains several blogs", () => {
  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertAllTestBlogsToCollection()
  })

  test("all the blogs in the collection are returned", async () => {
    const blogs = await BF.allBlogsFromCollectionUsingGET()
    expect(blogs).toHaveLength(BF.NUMBER_OF_TEST_BLOGS)
  })
})


describe("When a blog is added to the collection", () => {
  const blogInfoToAdd = BF.testBlogs[1]
  let blogs = undefined

  beforeAll(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    await BF.addBlogToCollectionUsingPOST(blogInfoToAdd)
    blogs = await BF.allBlogsFromCollectionUsingGET()
  })

  test("the number of blogs in the collection increases by 1", async () => {
    expect(blogs).toHaveLength(1 + 1)
  })

  test("the added blog has correct information", async () => {
    const blog = blogs.find(b => b.author === blogInfoToAdd.author)
    expect(blog).toBeDefined()
    expect(blog.title).toBe(blogInfoToAdd.title)
    expect(blog.likes).toBe(blogInfoToAdd.likes)
    expect(blog.url).toBe(blogInfoToAdd.url)
  })
})
