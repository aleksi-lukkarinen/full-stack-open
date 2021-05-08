import React from "react"

import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"

import BlogListItem from "./BlogListItem"


const dummyFunc = () => {}

const testUser = {
  id: "1",
  username: "mmikkol",
  name: "Martti Mikkola",
}

const testBlog = {
  title: "otsikko",
  author: "kirjoittaja",
  likes: 12345,
  url: "http://testaaja.blogger.fi/",
  user: testUser
}


beforeAll(() => {
  jest.mock("react-i18next")
})

describe("BlogListItem", () => {
  test("by default, renders only blog title and author", () => {

    const component = render(
      <BlogListItem
        blog={ testBlog }
        blogs={ undefined }
        setBlogs={ dummyFunc }
        currentUser={ testUser }
        setInfoMessage={ dummyFunc }
        setErrorMessage={ dummyFunc } />
    )

    const e = expect(component.container)
    e.toHaveTextContent(testBlog.title)
    e.toHaveTextContent(testBlog.author)
    e.not.toHaveTextContent(testBlog.url)
    e.not.toHaveTextContent(testBlog.likes)
  })

})
