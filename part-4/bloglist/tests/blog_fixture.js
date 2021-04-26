const config = require("../utils/config")
const logger = require("../utils/logger")
const Blog = require("../models/blog")
const User = require("../models/user")
const LF = require("./login_fixture")


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
    const msg = "Error while clearing blog collection: "
    logger.error(msg, error)
  }
}

async function insertFirstTestBlogToCollection() {
  try  {
    const user = await User.findOne({})
    const blogToInsert = testBlogs[0]
    blogToInsert.user = user._id
    const blog = new Blog(blogToInsert)
    await blog.save()
  }
  catch (error) {
    const msg = "Error while inserting a test blog to collection: "
    logger.error(msg, error)
  }
}

async function insertAllTestBlogsToCollection() {
  try  {
    const user = await User.findOne({})
    const blogsToInsert = testBlogs
    blogsToInsert.forEach(b => b.user = user._id)
    await Blog.insertMany(blogsToInsert)
  }
  catch (error) {
    const msg = "Error while inserting test blogs to collection: "
    logger.error(msg, error)
  }
}

async function nonExistingBlogId() {
  const blog = new Blog(dummyBlogData)
  await blog.save()
  await blog.remove()
  const result = blog._id.toString()
  return result
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

  async function getBlog(idOfBlogToRetrieve) {
    const response =
      await supertestApi.get(blogPathFrom(idOfBlogToRetrieve))

    return response.body
  }

  function postNewBlog(blogToInsert) {
    return supertestApi
      .post(config.URL_API_BLOGS)
      .send(blogToInsert)
  }

  function postNewBlogAsUser(blogToInsert, user) {
    const authToken = LF.generateTestAuthTokenFor(user)

    let request = supertestApi.post(config.URL_API_BLOGS)
    request.set(config.HTTP_HEADER_AUTHORIZATION,
      `${config.HTTP_AUTH_SCHEME_BEARER} ${authToken}`)
    const result = request.send(blogToInsert)

    return result
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

  function deleteBlogByIdAsUser(idOfBlogToDelete, user) {
    const authToken = LF.generateTestAuthTokenFor(user)

    const result = supertestApi
      .delete(blogPathFrom(idOfBlogToDelete))
      .set(config.HTTP_HEADER_AUTHORIZATION,
        `${config.HTTP_AUTH_SCHEME_BEARER} ${authToken}`)

    return result
  }

  return {
    getAllBlogs,
    getBlog,
    postNewBlog,
    postNewBlogAsUser,
    putBlogUpdateById,
    deleteBlogById,
    deleteBlogByIdAsUser,
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