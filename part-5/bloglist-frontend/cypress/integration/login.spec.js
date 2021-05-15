/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("Logging in should be", () => {
  beforeEach(() => {
    cy.resetDB().then(() => {
      cy.postDefaultUsers(2).then(() => {
        cy.openMainPage()
      })
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it("allowed when the credentials are correct", () => {
    cy.get("@existingUsers").then(existingUsers => {
      const { 0: testUser } = existingUsers

      enterLoginUsername(testUser.username)
      enterLoginPassword(testUser.password)
      clickLoginButton()

      displayedUsernameShouldBe(testUser.name)
    })
  })

  it("denied when the credentials are incorrect", () => {
    const nonExistingUser = {
      username: "eiolema",
      password: "puppu",
    }

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
