const _ = require("lodash")
const BF = require("../blog_fixture")
const listHelper = require("../../utils/list_helper")


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
    const result = listHelper.totalLikes([BF.testBlogs[0]])
    expect(result).toBe(BF.testBlogs[0].likes)
  })
  test("of a bigger list is calculated correctly", () => {
    const result = listHelper.totalLikes(BF.testBlogs)
    expect(result).toBe(BF.SUM_OF_LIKES_IN_TEST_BLOGS)
  })
})

describe("favorite blog", () => {
  test("of an empty list is undefined", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })
  test("when list has only one blog equals that blog", () => {
    const result = listHelper.favoriteBlog([BF.testBlogs[0]])
    const expected = _.pick(BF.testBlogs[0],
      listHelper.FAVORITE_BLOG_FIELD_NAMES)

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.favoriteBlog(BF.testBlogs)
    const expected = _.pick(BF.favoriteTestBlog,
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
    const result = listHelper.mostBlogs([BF.testBlogs[0]])
    const expected = {
      author: BF.testBlogs[0].author,
      blogs: 1
    }

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.mostBlogs(BF.testBlogs)
    const expected = {
      author: BF.AUTHOR_WITH_MOST_BLOGS,
      blogs: BF.N_OF_BLOGS_OF_AUTHOR_WITH_MOST_BLOGS,
    }
    expect(result).toEqual(expected)
  })
})

describe("most liked author", () => {
  test("of an empty list is undefined", () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })
  test("when list has only one blog results in the author of that blog", () => {
    const result = listHelper.mostLikes([BF.testBlogs[0]])
    const expected = {
      author: BF.testBlogs[0].author,
      likes: BF.testBlogs[0].likes,
    }

    expect(result).toEqual(expected)
  })
  test("of a bigger list is correct", () => {
    const result = listHelper.mostLikes(BF.testBlogs)
    const expected = {
      author: BF.AUTHOR_WITH_MOST_LIKES,
      likes: BF.N_OF_LIKES_OF_AUTHOR_WITH_MOST_BLOGS,
    }
    expect(result).toEqual(expected)
  })
})
