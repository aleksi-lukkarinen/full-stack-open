const config = require("../utils/config")
const logger = require("../utils/logger")
const Blog = require("../models/blog")


const AUTHOR_WITH_MOST_BLOGS = "Robert C. Martin"
const AUTHOR_WITH_MOST_LIKES = "Edsger W. Dijkstra"

const testBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Canonical string reduction",
    author: AUTHOR_WITH_MOST_LIKES,
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: AUTHOR_WITH_MOST_LIKES,
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "First class tests",
    author: AUTHOR_WITH_MOST_BLOGS,
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: AUTHOR_WITH_MOST_BLOGS,
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: AUTHOR_WITH_MOST_BLOGS,
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
]

const NUMBER_OF_TEST_BLOGS = testBlogs.length


async function clearBlogCollection() {
  try {
    await Blog.deleteMany({})
  }
  catch (error) {
    const msg = "Error while clearing blog database: "
    logger.error(msg, error)
  }
}

async function insertFirstTestBlogToCollection() {
  try  {
    const blogInfo = new Blog(testBlogs[0])
    await blogInfo.save()
  }
  catch (error) {
    const msg = "Error while inserting a test blog to database: "
    logger.error(msg, error)
  }
}

async function insertAllTestBlogsToCollection() {
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

async function allBlogsFromCollectionUsingGET(api) {
  return await api
    .get(config.URL_API_BLOGS)
    .then(response => response.body)
}

async function nonExistingBlogId() {
  const dummyBlogData = {
    title: "will-remove-this-soon",
    author: "dummy-author",
    likes: 9999,
    url: "http://dummies.com/",
  }
  const note = new Blog(dummyBlogData)
  await note.save()
  await note.remove()

  return note._id.toString()
}

module.exports = {
  TEST_AUTHOR_1: AUTHOR_WITH_MOST_BLOGS,
  TEST_AUTHOR_2: AUTHOR_WITH_MOST_LIKES,
  NUMBER_OF_TEST_BLOGS,
  testBlogs,

  clearBlogCollection,
  insertFirstTestBlogToCollection,
  insertAllTestBlogsToCollection,
  allBlogsFromCollectionUsingGET,
  nonExistingBlogId,
}