const _ = require("lodash")

const SUM_OF_LIKES_IN_TEST_BLOGS = 36

const TEST_AUTHOR_1 = "Robert C. Martin"
const TEST_AUTHOR_2 = "Edsger W. Dijkstra"
const mostBlogsInfoFromTestBlogs = {
  author: TEST_AUTHOR_1,
  blogs: 3
}
const mostLikesInfoFromTestBlogs = {
  author: TEST_AUTHOR_2,
  likes: 17
}

const testFavoriteBlog = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: TEST_AUTHOR_2,
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
}

const testBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  testFavoriteBlog,
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: TEST_AUTHOR_2,
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: TEST_AUTHOR_1,
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
]

const listHelper = require("../utils/list_helper")



test("dummy returns one", () => {
  const blogs = [] // eslint-disable no-unused-vars

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of an empty list is zero", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([testBlogs[0]])
    expect(result).toBe(testBlogs[0].likes)
  })
  test("of a bigger list is calculated correctly", () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(SUM_OF_LIKES_IN_TEST_BLOGS)
  })
})

describe("favorite blog", () => {
  test("of an empty list is undefined", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })
  test("when list has only one blog equals that blog", () => {
    const result = listHelper.favoriteBlog([testBlogs[0]])
    const expected = _.pick(testBlogs[0],
      listHelper.FAVORITE_BLOG_FIELD_NAMES)

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.favoriteBlog(testBlogs)
    const expected = _.pick(testFavoriteBlog,
      listHelper.FAVORITE_BLOG_FIELD_NAMES)

    expect(result).toEqual(expected)
  })
})

describe("author with most blogs", () => {
  test("of an empty list is undefined", () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })
  test("when list has only one blog results in the author of that blog", () => {
    const result = listHelper.mostBlogs([testBlogs[0]])
    const expected = {
      author: testBlogs[0].author,
      blogs: 1
    }

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.mostBlogs(testBlogs)
    const expected = mostBlogsInfoFromTestBlogs
    expect(result).toEqual(expected)
  })
})

describe("most liked author", () => {
  test("of an empty list is undefined", () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })
  test("when list has only one blog results in the author of that blog", () => {
    const result = listHelper.mostLikes([testBlogs[0]])
    const expected = {
      author: testBlogs[0].author,
      likes: testBlogs[0].likes,
    }

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.mostLikes(testBlogs)
    const expected = mostLikesInfoFromTestBlogs
    expect(result).toEqual(expected)
  })
})