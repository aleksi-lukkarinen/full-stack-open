/* eslint prefer-arrow-callback: "off" */

const nonExistingUser = {
  username: "eiolema",
  password: "puppu",
}

/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/


describe("When a user tries to log in, BlogList", function() {
  let testUser

  beforeEach(function() {
    cy.resetDB()
    cy.postDefaultUsers().then(users =>
      // eslint-disable-next-line prefer-destructuring
      testUser = users[0]
    )
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

    cy.errorNotificationIsRedAndContains(
      "Incorrect username or password")

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
