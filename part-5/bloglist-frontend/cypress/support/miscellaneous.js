Cypress.Commands.add("openMainPage", () => {
  const url = Cypress.config("baseUrl")

  Cypress.log({
    name: "main page",
    message: `Address: ${url}`,
  })

  cy.visit(url, { log: false })
})



Cypress.Commands.add("documentBody", () => {
  cy.get("body")
})



Cypress.Commands.add("errorNotificationIsRedAndContains", text => {
  cy.errorNotification().should(elNotif => {
    expect(elNotif, "Error Notification")
        .to.have.css("background-color", Cypress.config("colorNotificationErrorBg"))

    const elMsg = elNotif.find(`:contains('${text}')`)
    expect(elMsg.length, "Number of Notification Elements with the Text").to.equal(1)
  })
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
