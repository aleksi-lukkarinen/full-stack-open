import React from "react"

import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BlogInsertionForm from "./BlogInsertionForm"


const TR_KEY_CMD_INSERT = "BlogInsertionForm.cmdInsert"

const createTestUser = () => ({
  id: "1",
  username: "mmikkol",
  name: "Martti Mikkola",
})

const createTestBlog = user => ({
  title: "otsikko",
  author: "kirjoittaja",
  likes: 12345,
  url: "http://testaaja.blogger.fi/",
  user
})


describe("BlogInsertionForm,", () => {
  let testUser = undefined
  let testBlog = undefined

  beforeEach(() => {
    testUser = createTestUser()
    testBlog = createTestBlog(testUser)
  })

  test("when submitted, calls the callback with correct data", () => {
    const insertionHandlerMock = createHandlerMock()

    const testComponent = render(
      <BlogInsertionForm
        handleBlogInsertion={ insertionHandlerMock } />
    )

    typeBlogTitle(testComponent, testBlog.title)
    typeBlogAuthor(testComponent, testBlog.author)
    typeBlogUrl(testComponent, testBlog.url)
    pressSubmitButton(testComponent)

    const e = expect(insertionHandlerMock)
    e.toHaveBeenCalledTimes(1)
    e.toHaveBeenNthCalledWith(1,
      testBlog.title, testBlog.author, testBlog.url)
  })
})


const createHandlerMock = (...params) => jest.fn(...params)

const typeBlogTitle = (component, title) => {
  const txtNewBlogTitle =
    component.container.querySelector("#txtNewBlogTitle")

  userEvent.type(txtNewBlogTitle, title)
}

const typeBlogAuthor = (component, author) => {
  const txtNewBlogAuthor =
    component.container.querySelector("#txtNewBlogAuthor")

  userEvent.type(txtNewBlogAuthor, author)
}

const typeBlogUrl = (component, url) => {
  const txtNewBlogUrl =
    component.container.querySelector("#txtNewBlogUrl")

  userEvent.type(txtNewBlogUrl, url)
}

const pressSubmitButton = testComponent => {
  const cmdSubmit = testComponent.getByText(TR_KEY_CMD_INSERT)
  userEvent.click(cmdSubmit)
}
