/* eslint prefer-arrow-callback: "off" */

const nonExistingUser = {
  username: "eiolema",
  password: "puppu",
}

/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("When user tries to log in, BlogList", function() {
  let testUser

  before(async function() {
    testUser = await cy.fixture("testUser")
  })

  beforeEach(function() {
    cy.resetDB()
    cy.postUser(testUser)
    cy.openMainPage()
  })

  it("should allow it when credentials are correct", function() {
    enterLoginUsername(testUser.username)
    enterLoginPassword(testUser.password)
    clickLoginButton()

    displayedUsernameShouldBe(testUser.name)
  })

  it("should disallow it when credentials are incorrect", function() {
    enterLoginUsername(nonExistingUser.username)
    enterLoginPassword(nonExistingUser.password)
    clickLoginButton()

    cy.errorNotification()
        .should("contain", "Incorrect username or password")
        .and("have.css", "background-color", "rgb(253, 236, 234)")

    displayedUsernameShouldBe("Unknown")
  })
})

function enterLoginUsername(name) {
  loginForm().get("#txtUsername").type(name)
}

function enterLoginPassword(password) {
  loginForm().get("#txtPassword").type(password)
}

function clickLoginButton() {
  loginForm().get("#cmdLogin").click()
}

function loginForm() {
  return cy.get("#loginForm")
}

function displayedUsernameShouldBe(name) {
  cy.get(".currentUserName").should("contain", name)
}
