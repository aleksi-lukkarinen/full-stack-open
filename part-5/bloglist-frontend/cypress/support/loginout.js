
const ALIAS_LOGGED_IN_USER = "loggedInUser"


Cypress.Commands.add("postLogin", userToLogIn => {
  const { name, username, password } = userToLogIn
  Cypress.log({
    name: "post",
    message: `Login: ${name} (${username}, ${password})`,
    consoleProps: () => userToLogIn
  })

  const dataToPost = {
    username: userToLogIn.username,
    password: userToLogIn.password,
  }

  const requestData = {
    method: "POST",
    url: Cypress.config("urlApiLogin"),
    body: dataToPost,
    log: false
  }

  cy.request(requestData).then(response => {
    const { id, token } = response.body
    const loggedInUser = { name, username, id, token }

    Cypress.log({
      name: "success",
      message: `User ID: ${id} Token: ${token}`,
      consoleProps: () => loggedInUser
    })

    const userJson = JSON.stringify(response.body)
    localStorage.setItem("loggedBlogListUser", userJson)
    expect(
      localStorage.getItem("loggedBlogListUser"),
      "User data in local storage")
        .to.equal(userJson)

    cy.wrap(loggedInUser, { log: false }).as(ALIAS_LOGGED_IN_USER)
  })
})



Cypress.Commands.add("clearUserDataFromLocalStorage", () => {
  Cypress.log({
    name: "LS",
    message: "Clear login",
  })

  cy.clearLocalStorage("loggedBlogListUser", { log: false }).then(ls => {
    expect(
      ls.getItem("loggedBlogListUser"),
      "User data in local storage")
        .to.be.null
  })
})



Cypress.Commands.add("logout", () => {
  cy.clearUserDataFromLocalStorage().then(() => {
    cy.openMainPage()
  })

  cy.wrap(undefined, { log: false }).as(ALIAS_LOGGED_IN_USER)
})
