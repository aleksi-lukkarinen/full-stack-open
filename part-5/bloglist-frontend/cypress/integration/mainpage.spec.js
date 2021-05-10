/* eslint prefer-arrow-callback: "off" */

/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/


it("When started, BlogList should open the login page", function() {
  cy.resetDB()
  cy.openMainPage()
  cy.documentBody().should("contain", "Log in to BlogList")
})
