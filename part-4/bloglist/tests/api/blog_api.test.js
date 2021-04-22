const config = require("../../utils/config")
const logger = require("../../utils/logger")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const api = supertest(app)
const Blog = require("../../models/blog")

const TEST_AUTHOR_1 = "Robert C. Martin"
const TEST_AUTHOR_2 = "Edsger W. Dijkstra"

const testBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Canonical string reduction",
    author: TEST_AUTHOR_2,
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: TEST_AUTHOR_2,
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "First class tests",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
]

async function clearBlogCollection() {
  try {
    await Blog.deleteMany({})
  }
  catch (error) {
    const msg = "Error while clearing blog database: "
    logger.error(msg, error)
  }
}

async function insertFirstTestBlogToDB() {
  try  {
    const blogInfo = new Blog(testBlogs[0])
    await blogInfo.save()
  }
  catch (error) {
    const msg = "Error while inserting a test blog to database: "
    logger.error(msg, error)
  }
}

async function insertAllTestBlogsToDB() {
  try  {
    for (let i=0; i<testBlogs.length; i++) {
      const blogInfo = new Blog(testBlogs[i])
      await blogInfo.save()
    }
  }
  catch (error) {
    const msg = "Error while inserting test blogs to database: "
    logger.error(msg, error)
  }
}

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
  beforeEach(async () => { await clearBlogCollection() })

  test("getting blogs results in an empty list", async () => {
    await clearBlogCollection()
    const response = await api.get(config.URL_API_BLOGS)
    expect(response.body).toHaveLength(0)
  })
})

describe("When blog collection contains one entry", () => {
  beforeEach(async () => {
    await clearBlogCollection()
    await insertFirstTestBlogToDB()
  })
})

describe("When blog collection contains several entries", () => {
  beforeEach(async () => {
    await clearBlogCollection()
    await insertAllTestBlogsToDB()
  })

  test("all the blogs in the collection are returned", async () => {
    const response = await api.get(config.URL_API_BLOGS)
    expect(response.body).toHaveLength(testBlogs.length)
  })
})
