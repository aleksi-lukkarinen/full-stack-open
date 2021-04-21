
const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = [] // eslint-disable no-unused-vars

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
