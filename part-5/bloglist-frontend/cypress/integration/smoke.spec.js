/* eslint prefer-arrow-callback: "off" */

const nonExistingUser = {
  username: "eiolema",
  password: "puppu",
}


describe("BlogList,", function() {
  let testUser

  before(async function() {
    testUser = await cy.fixture("testUser")
  })

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users/", testUser)
    cy.visit("http://localhost:3000")
  })

  it("after starting, should display the login page", function() {
    documentBody().should("contain", "Log in to BlogList")
  })

  describe("when user tries to log in,", function() {
    it("should allow it when credentials are correct", function() {
      enterLoginUsername(testUser.username)
      enterLoginPassword(testUser.password)
      clickLoginButton()

      displayedUsernameShouldBe(testUser.name)
    })

    it("should fail it when credentials are incorrect", function() {
      enterLoginUsername(nonExistingUser.username)
      enterLoginPassword(nonExistingUser.password)
      clickLoginButton()

      errorNotification()
          .should("contain", "Incorrect username or password")
          .and("have.css", "background-color", "rgb(253, 236, 234)")

      displayedUsernameShouldBe("Unknown")
    })
  })

})

function documentBody() {
  return cy.get("body")
}

function loginForm() {
  return cy.get("#loginForm")
}

function errorNotification() {
  return cy.get("#notificationerror")
}

function enterLoginUsername(name) {
  loginForm().get("#txtUsername").type(name)
}

function enterLoginPassword(password) {
  loginForm().get("#txtPassword").type(password)
}

function clickLoginButton() {
  loginForm().get("#cmdLogin").click()
}

function displayedUsernameShouldBe(name) {
  cy.get(".currentUserName").should("contain", name)
}
