/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("A blog", () => {
  let existingUsers = []
  let loggedInUser = undefined
  let existingBlogs = []

  beforeEach(() => {
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

  it("can be created as well as its details shown and hidden", () => {
    const blogToCreate = {
      title: "Test blog title",
      author: "Test blog author",
      url: "https://testblog.server.com/"
    }

    cy.get("#cmdShowBlogInsertionForm").click()
    cy.get("#txtNewBlogTitle").type(blogToCreate.title)
    cy.get("#txtNewBlogAuthor").type(blogToCreate.author)
    cy.get("#txtNewBlogUrl").type(blogToCreate.url)
    cy.get("#cmdSubmitBlogInsertionForm").click()

    cy.get(".blogListContainer").as("blogListContainer")

    cy.get("@blogListContainer").contains(blogToCreate.title).as("blogTitle")
    cy.get("@blogTitle").should("have.class", "blogTitle")

    cy.get("@blogTitle").parent().parent().as("blogListItem")
    cy.get("@blogListItem").should("have.class", "blogListItem")

    cy.get("@blogListItem").contains(blogToCreate.author)
        .should("have.class", "blogAuthor")

    cy.get("@blogListItem").find(".blogUrl").should("not.exist")

    cy.get("@blogListItem").contains("Show").as("visibilityButton")
    cy.get("@visibilityButton")
        .should("have.class", "btnDetailVisibility")
        .click()

    cy.get("@blogListItem").contains(blogToCreate.url)
        .should("have.class", "blogUrl")

    cy.get("@visibilityButton")
        .should("contain", "Hide")
        .click()
  })

  it("can be liked", () => {
    cy.get(".blogListContainer")
        .contains(existingBlogs[0].title)
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

  it("can be deleted by the user who inserted it", () => {
    const { 0: blogToDelete } = existingBlogs

    cy.get(".blogListContainer")
        .contains(blogToDelete.title)
        .parent().parent().as("blogListItem")

    cy.get("@blogListItem").contains("Show").click()
    cy.get("@blogListItem").contains("Delete").click()

    cy.get(".blogListContainer").then(container => {
      const btn = container.find(`:contains('${blogToDelete.title}')`)
      expect(btn.length, "Elements with the Title of the Deleted Blog").to.equal(0)
    })
  })

  it("can not be deleted by a user who did not insert it", () => {
    const { 0: blogToDelete } = existingBlogs
    const { 1: otherUser } = existingUsers

    cy.clearLogin()
    cy.postLogin(otherUser).then(() => {
      cy.openMainPage()

      cy.get(".blogListContainer")
          .contains(blogToDelete.title)
          .parent().parent().as("blogListItem")

      cy.get("@blogListItem").contains("Show").click()

      cy.get("@blogListItem").then(blItem => {
        const btn = blItem.find("button:contains('Delete')")
        expect(btn.length, "Number of Delete buttons").to.equal(0)
      })
    })
  })

})
