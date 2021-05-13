/* eslint prefer-arrow-callback: "off" */

/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("A blog", function() {
  let existingUsers = []
  let loggedInUser = undefined
  let existingBlogs = []

  beforeEach(function() {
    cy.resetDB()

    cy.postDefaultUsers(2).then(users => {
      existingUsers = users

      cy.postLogin(existingUsers[0]).then(u => {
        loggedInUser = u

        cy.postDefaultBlogs(2, loggedInUser).then(blogs => {
          existingBlogs = blogs
          cy.openMainPage()
        })
      })
    })
  })

  it("can be created as well as its details shown and hidden", function() {
    const testBlog = {
      title: "Test blog title",
      author: "Test blog author",
      url: "https://testblog.server.com/"
    }

    cy.get("#cmdShowBlogInsertionForm").click()
    cy.get("#txtNewBlogTitle").type(testBlog.title)
    cy.get("#txtNewBlogAuthor").type(testBlog.author)
    cy.get("#txtNewBlogUrl").type(testBlog.url)
    cy.get("#cmdSubmitBlogInsertionForm").click()

    cy.get(".blogListContainer").as("blogListContainer")

    cy.get("@blogListContainer").contains(testBlog.title).as("blogTitle")
    cy.get("@blogTitle").should("have.class", "blogTitle")

    cy.get("@blogTitle").parent().parent().as("blogListItem")
    cy.get("@blogListItem").should("have.class", "blogListItem")

    cy.get("@blogListItem").contains(testBlog.author)
        .should("have.class", "blogAuthor")

    cy.get("@blogListItem").find(".blogUrl").should("not.exist")

    cy.get("@blogListItem").contains("Show").as("visibilityButton")
    cy.get("@visibilityButton")
        .should("have.class", "btnDetailVisibility")
        .click()

    cy.get("@blogListItem").contains(testBlog.url)
        .should("have.class", "blogUrl")

    cy.get("@visibilityButton")
        .should("contain", "Hide")
        .click()
  })

  it("can be liked", function() {
    const { 0: testBlog } = existingBlogs

    cy.get(".blogListContainer")
        .contains(testBlog.title)
        .parent().parent().as("blogListItem")

    cy.get("@blogListItem").contains("Show").click()

    cy.get("@blogListItem").find(".blogLikes").as("blogLikes")
    cy.get("@blogListItem").contains("Like").as("btnLike")

    cy.get("@blogLikes").should("contain", "0 likes")

    cy.get("@btnLike").click()
    cy.get("@blogLikes").should("contain", "1 like")

    cy.get("@btnLike").click()
    cy.get("@blogLikes").should("contain", "2 likes")
  })

})
