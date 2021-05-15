
Cypress.Commands.add("resetDB", () => {
  const requestData = {
    method: "POST",
    url: Cypress.config("urlApiTestingReset"),
    log: false
  }

  const verbosePost = `${requestData.method} ${requestData.url}`

  Cypress.log({
    name: "reset db",
    message: verbosePost,
    consoleProps: () => ({
      "Method": requestData.method,
      "URL": requestData.url,
    })
  })

  cy.request(requestData)
})
