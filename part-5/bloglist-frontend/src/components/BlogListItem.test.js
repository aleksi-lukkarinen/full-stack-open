import React from "react"

import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import _ from "lodash"

import BlogListItem from "./BlogListItem"


const TR_KEY_LIKES = "BlogListItem.likes"

const createHandlerMock = (...params) => jest.fn(...params)

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

const defaultHandleDetailVisibilityToggling =
  (blogDetailsAreVisible, setDetailVisibility) =>
    event => {
      event.preventDefault()
      setDetailVisibility(!blogDetailsAreVisible)
    }


beforeAll(() => {
  jest.mock("react-i18next")
})

describe("BlogListItem,", () => {
  test("by default, shows only blog title and author", () => {
    const testUser = createTestUser()
    const testBlog = createTestBlog(testUser)
    const testComponent = render(
      <BlogListItem
        blog={ testBlog }
        handleDetailVisibilityToggling={ defaultHandleDetailVisibilityToggling }
        deleteButtonIsVisible={ true }
        handleAddLike={ createHandlerMock() }
        handleDeleteBlog={ createHandlerMock() } />
    )

    const e = expect(testComponent.container)
    e.toHaveTextContent(testBlog.title)
    e.toHaveTextContent(testBlog.author)
    e.not.toHaveTextContent(testBlog.url)
    e.not.toHaveTextContent(testBlog.likes)
    e.not.toHaveTextContent(TR_KEY_LIKES)
  })

  test("after the \"Show\" button is clicked, shows full blog info", () => {
    const testUser = createTestUser()
    const testBlog = createTestBlog(testUser)
    const testComponent = render(
      <BlogListItem
        blog={ testBlog }
        handleDetailVisibilityToggling={ defaultHandleDetailVisibilityToggling }
        deleteButtonIsVisible={ true }
        handleAddLike={ createHandlerMock() }
        handleDeleteBlog={ createHandlerMock() } />
    )
    const TC = testComponent.container

    const btn = TC.querySelector(".btnDetailVisibility")
    fireEvent.click(btn)

    const e = expect(TC)
    e.toHaveTextContent(testBlog.title)
    e.toHaveTextContent(testBlog.author)
    e.toHaveTextContent(testBlog.url)
    e.toHaveTextContent(TR_KEY_LIKES)

    const divLikes = TC.querySelector(".blogLikes")
    expect(divLikes).toHaveAttribute("data-likes", String(testBlog.likes))
  })

  test("when the Like button is pressed twice, calls the event handler twice", () => {
    const testUser = createTestUser()
    const testBlog = createTestBlog(testUser)

    const likeHandlerMock = createHandlerMock()

    const testComponent = render(
      <BlogListItem
        blog={ testBlog }
        handleDetailVisibilityToggling={ defaultHandleDetailVisibilityToggling }
        deleteButtonIsVisible={ true }
        handleAddLike={ likeHandlerMock }
        handleDeleteBlog={ createHandlerMock() } />
    )

    const btnVisibility = testComponent.container
        .querySelector(".btnDetailVisibility")
    userEvent.click(btnVisibility)

    const btnLike = testComponent.container
        .querySelector(".btnLike")

    _.times(2, () => userEvent.click(btnLike))

    expect(likeHandlerMock).toHaveBeenCalledTimes(2)
  })
})
