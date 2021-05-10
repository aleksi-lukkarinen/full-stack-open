
Cypress.Commands.add("resetDB", () => {
  cy.request("POST", "http://localhost:3003/api/testing/reset")
})

Cypress.Commands.add("postUser", userData => {
  cy.request("POST", "http://localhost:3003/api/users/", userData)
})

Cypress.Commands.add("postLogin", (userdata) => {
  const dataToPost = {
    username: userdata.usename,
    password: userdata.password,
  }

  cy.request("POST", "http://localhost:3003/api/login", dataToPost)
      .then(response => {
        localStorage.setItem(
          "loggedBlogListUser",
          JSON.stringify(response.body))
      })
})

Cypress.Commands.add("openMainPage", () => {
  cy.visit("http://localhost:3000")
})

Cypress.Commands.add("documentBody", () => {
  cy.get("body")
})

Cypress.Commands.add("loginForm", () => {
  cy.get("#loginForm")
})

Cypress.Commands.add("errorNotification", () => {
  cy.get("#notificationerror")
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
