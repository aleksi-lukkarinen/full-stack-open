/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("Without being logged in," , () => {
  beforeEach(() => {
    cy.resetDB().then(() => {
      cy.openMainPage()
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it("navigating to the root should result in the login page being displayed", () => {
    cy.documentBody().should("contain", "Log in to BlogList")
  })
})
