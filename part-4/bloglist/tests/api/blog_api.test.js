const config = require("../../utils/config")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const sApi = supertest(app)
const _ = require("lodash")
const BF = require("../blog_fixture")
const BFHttp = BF.httpUtils(sApi)


afterAll(async () => {
  await mongoose.connection.close()
})


test("Blogs are returned as JSON", async () => {
  await sApi
    .get(config.URL_API_BLOGS)
    .expect(config.HTTP_STATUS_OK)
    .expect("Content-Type", /application\/json/)
})


describe("When the blog collection is empty", () => {
  beforeEach(async () => { await BF.clearBlogCollection() })

  test("retrieving all blogs results in an empty list", async () => {
    await BF.clearBlogCollection()
    const blogs = await BFHttp.getAllBlogs()
    expect(blogs).toHaveLength(0)
  })
})


describe("When the blog collection contains one blog", () => {
  let blogs = undefined

  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    blogs = await BFHttp.getAllBlogs()
  })

  test("a set of only that blog is returned", async () => {
    expect(blogs).toHaveLength(1)
  })

  test("that blog can be retrieved by its ID", async () => {
    const idOfBlogToRetrieve = blogs[0].id
    const blog = await BFHttp.getBlog(idOfBlogToRetrieve)
    expect(blog).toBeDefined()
    expect(blog.title).toBe(blogs[0].title)
  })
})


describe("A blog can be modified by", () => {
  let existingBlog

  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    const blogs = await BFHttp.getAllBlogs()
    existingBlog = blogs[0]
  })

  test("updating its title", async () => {
    const updatedBlogData = { title: "A new title" }
    await BFHttp.putBlogUpdateById(existingBlog.id, updatedBlogData)
    const blogsAfterUpdate = await BFHttp.getAllBlogs()
    const updatedBlog = blogsAfterUpdate.find(b => b.id === existingBlog.id)
    expect(updatedBlog.title).toBe(updatedBlogData.title)
  })

  test("updating its author", async () => {
    const updatedBlogData = { author: "A new author" }
    await BFHttp.putBlogUpdateById(existingBlog.id, updatedBlogData)
    const blogsAfterUpdate = await BFHttp.getAllBlogs()
    const updatedBlog = blogsAfterUpdate.find(b => b.id === existingBlog.id)
    expect(updatedBlog.author).toBe(updatedBlogData.author)
  })

  test("updating its likes", async () => {
    const updatedBlogData = { likes: 987654321 }
    await BFHttp.putBlogUpdateById(existingBlog.id, updatedBlogData)
    const blogsAfterUpdate = await BFHttp.getAllBlogs()
    const updatedBlog = blogsAfterUpdate.find(b => b.id === existingBlog.id)
    expect(updatedBlog.likes).toBe(updatedBlogData.likes)
  })

  test("updating its url", async () => {
    const updatedBlogData = { url: "A new url" }
    await BFHttp.putBlogUpdateById(existingBlog.id, updatedBlogData)
    const blogsAfterUpdate = await BFHttp.getAllBlogs()
    const updatedBlog = blogsAfterUpdate.find(b => b.id === existingBlog.id)
    expect(updatedBlog.url).toBe(updatedBlogData.url)
  })
})


describe("A blog returned from the collection", () => {
  let entryKeys = undefined

  beforeEach(async () => {
    await BF.clearBlogCollection()
    await BF.insertFirstTestBlogToCollection()
    const blogs = await BFHttp.getAllBlogs()
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
    const blogs = await BFHttp.getAllBlogs()
    expect(blogs).toHaveLength(BF.NUMBER_OF_TEST_BLOGS)
  })

  test("a single blog can be deleted by its ID", async () => {
    const blogsAtStart = await BFHttp.getAllBlogs()
    const blogToRemove = blogsAtStart[0]

    await BFHttp.deleteBlogById(blogToRemove.id)
      .expect(config.HTTP_STATUS_NO_CONTENT)

    const blogsAtEnd = await BFHttp.getAllBlogs()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContain(blogToRemove)
  })
})


describe("When a blog is added to the collection", () => {
  describe("in general", () => {
    const blogInfoToAdd = BF.testBlogs[1]
    let addedBlogs = undefined
    let addedBlog = undefined

    beforeAll(async () => {
      await BF.clearBlogCollection()
      await BF.insertFirstTestBlogToCollection()
      await BFHttp.postBlogAddingRequest(blogInfoToAdd)
        .expect(config.HTTP_STATUS_CREATED)
      addedBlogs = await BFHttp.getAllBlogs()
      addedBlog = addedBlogs.find(b => b.author === blogInfoToAdd.author)
    })

    test("the number of blogs in the collection increases by 1", async () => {
      expect(addedBlogs).toHaveLength(1 + 1)
    })

    test("the added blog has an id", async () => {
      expect(addedBlog.id).toBeDefined()
    })

    test("the added blog has correct information", async () => {
      expect(addedBlog).toBeDefined()
      expect(addedBlog.title).toBe(blogInfoToAdd.title)
      expect(addedBlog.likes).toBe(blogInfoToAdd.likes)
      expect(addedBlog.url).toBe(blogInfoToAdd.url)
    })
  })

  describe("without setting the \"likes\" field of the blog", () => {
    test("the value of the field will be set to zero", async () => {
      const blogToAdd = { title: "test blog", url: "http://dummy-land/" }
      await BF.clearBlogCollection()
      await BFHttp.postBlogAddingRequest(blogToAdd)
        .expect(config.HTTP_STATUS_CREATED)
      const blogs = await BFHttp.getAllBlogs()
      expect(blogs[0].likes).toBe(0)
    })
  })
})


describe("Trying to add a blog to the collection results in HTTP 400 when", () => {
  test("the title field is not set", async () => {
    const blogToAdd = { likes: 300, url: "http://dummy/", author: "Someone" }
    await BF.clearBlogCollection()
    await BFHttp.postBlogAddingRequest(blogToAdd)
      .expect(config.HTTP_STATUS_BAD_REQUEST)
  })

  test("the url field is not set", async () => {
    const blogToAdd = { likes: 300, title: "Dummy title", author: "Someone" }
    await BF.clearBlogCollection()
    await BFHttp.postBlogAddingRequest(blogToAdd)
      .expect(config.HTTP_STATUS_BAD_REQUEST)
  })
})


describe("Trying to delete a single blog by its ID results in", () => {
  test("HTTP 204 when the ID is unknown", async () => {
    const idOfBlogToDelete = await BF.nonExistingBlogId()

    await BFHttp.deleteBlogById(idOfBlogToDelete)
      .expect(config.HTTP_STATUS_NO_CONTENT)
  })

  test("HTTP 400 when the ID is malformatted", async () => {
    const invalidBlogId = "$$$....@@@"

    await BFHttp.deleteBlogById(invalidBlogId)
      .expect(config.HTTP_STATUS_BAD_REQUEST)
  })
})
