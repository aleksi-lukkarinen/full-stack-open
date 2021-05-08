import React, { Component } from "react"

import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"

import BlogListItem from "./BlogListItem"


const xlKeyLikes = "BlogListItem.likes"

function createMockHandler() {
  return jest.fn()
}

function createTestUser() {
  return {
    id: "1",
    username: "mmikkol",
    name: "Martti Mikkola",
  }
}

function createTestBlog(user) {
  return {
    title: "otsikko",
    author: "kirjoittaja",
    likes: 12345,
    url: "http://testaaja.blogger.fi/",
    user
  }
}

beforeAll(() => {
  jest.mock("react-i18next")
})

describe("BlogListItem,", () => {
  let testUser = undefined
  let testBlog = undefined
  let testBlogsArray = undefined
  let setBlogsHandlerMock = undefined
  let setInfoMessageHandlerMock = undefined
  let setErrorMessageHandlerMock = undefined
  let testComponent = undefined
  let TC = undefined

  beforeEach(() => {
    testUser = createTestUser()
    testBlog = createTestBlog(testUser)
    testBlogsArray = [testBlog]
    setBlogsHandlerMock = createMockHandler()
    setInfoMessageHandlerMock = createMockHandler()
    setErrorMessageHandlerMock = createMockHandler()
    testComponent = render(
      <BlogListItem
        blog={ testBlog }
        blogs={ testBlogsArray }
        setBlogs={ setBlogsHandlerMock }
        currentUser={ testUser }
        setInfoMessage={ setInfoMessageHandlerMock }
        setErrorMessage={ setErrorMessageHandlerMock } />
    )
    TC = testComponent.container
  })

  test("by default, shows only blog title and author", () => {
    const e = expect(TC)
    e.toHaveTextContent(testBlog.title)
    e.toHaveTextContent(testBlog.author)
    e.not.toHaveTextContent(testBlog.url)
    e.not.toHaveTextContent(testBlog.likes)
    e.not.toHaveTextContent(xlKeyLikes)
  })

  test("after the \"Show\" button is clicked, shows full blog info", () => {
    const btn = TC.querySelector(".btnDetailVisibility")
    fireEvent.click(btn)

    const e = expect(TC)
    e.toHaveTextContent(testBlog.title)
    e.toHaveTextContent(testBlog.author)
    e.toHaveTextContent(testBlog.url)
    e.toHaveTextContent(xlKeyLikes)

    const divLikes = TC.querySelector(".blogLikes")
    expect(divLikes).toHaveAttribute("data-likes", String(testBlog.likes))
  })
})
