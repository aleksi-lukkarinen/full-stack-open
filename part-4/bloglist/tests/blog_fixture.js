const config = require("../utils/config")
const logger = require("../utils/logger")
const Blog = require("../models/blog")


const dummyBlogData = {
  title: "will-remove-this-soon",
  author: "dummy-author",
  likes: 9999,
  url: "http://dummies.com/",
}

const AUTHOR_WITH_MOST_BLOGS = "Robert C. Martin"
const N_OF_BLOGS_OF_AUTHOR_WITH_MOST_BLOGS = 3
const AUTHOR_WITH_MOST_LIKES = "Edsger W. Dijkstra"
const N_OF_LIKES_OF_AUTHOR_WITH_MOST_BLOGS = 17
const SUM_OF_LIKES_IN_TEST_BLOGS = 36

const favoriteTestBlog = {
  title: "Canonical string reduction",
  author: AUTHOR_WITH_MOST_LIKES,
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
}

const testBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  favoriteTestBlog,
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
    await Blog.insertMany(testBlogs)
  }
  catch (error) {
    const msg = "Error while inserting test blogs to database: "
    logger.error(msg, error)
  }
}

async function nonExistingBlogId() {
  const note = new Blog(dummyBlogData)
  await note.save()
  await note.remove()

  return note._id.toString()
}

function blogPathFrom(blogId) {
  return `${config.URL_API_BLOGS}/${blogId}`
}

function httpUtils(supertestApi) {

  async function getAllBlogs() {
    const response =
      await supertestApi.get(config.URL_API_BLOGS)

    return response.body
  }

  function postBlogAddingRequest(blogToAdd) {
    return supertestApi
      .post(config.URL_API_BLOGS)
      .send(blogToAdd)
  }

  function putBlogUpdateById(idOfBlogToUpdate, updatedBlogData) {
    return supertestApi
      .put(blogPathFrom(idOfBlogToUpdate))
      .send(updatedBlogData)
  }

  function deleteBlogById(idOfBlogToDelete) {
    return supertestApi
      .delete(blogPathFrom(idOfBlogToDelete))
  }

  return {
    getAllBlogs,
    postBlogAddingRequest,
    putBlogUpdateById,
    deleteBlogById,
  }
}

module.exports = {
  AUTHOR_WITH_MOST_BLOGS,
  AUTHOR_WITH_MOST_LIKES,
  N_OF_BLOGS_OF_AUTHOR_WITH_MOST_BLOGS,
  N_OF_LIKES_OF_AUTHOR_WITH_MOST_BLOGS,
  NUMBER_OF_TEST_BLOGS,
  SUM_OF_LIKES_IN_TEST_BLOGS,

  favoriteTestBlog,
  testBlogs,
  dummyBlogData,

  clearBlogCollection,
  insertFirstTestBlogToCollection,
  insertAllTestBlogsToCollection,
  nonExistingBlogId,
  httpUtils,
}