/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("When navigating to the root without being logged in," , () => {
  it("the login page should be displayed", () => {
    cy.resetDB()
    cy.openMainPage()
    cy.documentBody().should("contain", "Log in to BlogList")
  })
})
