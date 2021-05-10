/* eslint prefer-arrow-callback: "off" */

const testUser = {
  username: "kkukkol",
  name: "Kari Kukkolainen",
  password: "123123",
  blogs: [],
}

describe("BlogList,", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users/", testUser)
    cy.visit("http://localhost:3000")
  })

  it("after starting, should display the login page", function() {
    cy.contains("Log in to BlogList")
  })

})
