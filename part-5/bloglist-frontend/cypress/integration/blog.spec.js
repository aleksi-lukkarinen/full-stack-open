/* eslint prefer-arrow-callback: "off" */

/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("A blog", function() {
  const testBlog = {
    title: "Test blog title",
    author: "Test blog author",
    url: "https://testblog.server.com/"
  }

  let testUser = undefined


  beforeEach(function() {
    cy.resetDB()
    cy.postDefaultUsers(2).then(existingUsers => {
      cy.postLogin(existingUsers[0]).then(loggedInUser => {
        testUser = loggedInUser
        cy.postDefaultBlogs(2, testUser).then(existingBlogs => {
          cy.openMainPage()
        })
      })
    })
  })


  it("can be created as well as its details shown and hidden", function() {
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

})
