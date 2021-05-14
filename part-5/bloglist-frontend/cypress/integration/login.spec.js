/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

const nonExistingUser = {
  username: "eiolema",
  password: "puppu",
}

describe("Logging in should be", () => {
  let testUser

  beforeEach(() => {
    cy.resetDB()
    cy.postDefaultUsers(2).then(users => {
      // eslint-disable-next-line prefer-destructuring
      testUser = users[0]

      cy.openMainPage()
    })
  })

  it("allowed when the credentials are correct", () => {
    enterLoginUsername(testUser.username)
    enterLoginPassword(testUser.password)
    clickLoginButton()

    displayedUsernameShouldBe(testUser.name)
  })

  it("denied when the credentials are incorrect", () => {
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
  cy.get(".currentUserName").should(element => {
    expect(element, "Username in the header")
        .to.have.text(name)
  })
}
