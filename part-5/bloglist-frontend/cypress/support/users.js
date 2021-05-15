
const ALIAS_USERS_IN_FIXTURE = "usersInFixture"
const ALIAS_USERS_EXISTING = "existingUsers"

let userFixture = undefined



Cypress.Commands.add("loadUserFixture", () => {
  if (userFixture)
    return cy.wrap(userFixture, { log: false }).as(ALIAS_USERS_IN_FIXTURE)

  cy.fixture("testUsers").then(loadedUsers => {
    userFixture = loadedUsers
    cy.wrap(loadedUsers, { log: false }).as(ALIAS_USERS_IN_FIXTURE)
  })
})



Cypress.Commands.add("postUser", (userToPost, shouldBeLogged) => {
  const SHOULD_LOG = shouldBeLogged !== false
    ? true : false

  const { name, username, password } = userToPost
  if (SHOULD_LOG) {
    Cypress.log({
      name: "post",
      message: `User: ${name} (${username}, ${password})`,
      consoleProps: () => userToPost
    })
  }

  const requestData = {
    method: "POST",
    url: Cypress.config("urlApiUsers"),
    body: userToPost,
    log: false
  }

  cy.request(requestData).then(response => {
    const { id } = response.body
    const postedUser = { name, username, password, id }
    if (SHOULD_LOG) {
      Cypress.log({
        name: "success",
        message: `User ID: ${id}`,
        consoleProps: () => postedUser
      })
    }
    cy.wrap(postedUser, { log: false })
  })
})



Cypress.Commands.add("postDefaultUsers", numberOfUsers => {
  const NO_LOGGING = false
  const NUM_REQUESTED_USERS = Number.isInteger(numberOfUsers)
    ? numberOfUsers : 2

  Cypress.log({
    name: "post",
    message: `${NUM_REQUESTED_USERS} default user(s) requested`,
    consoleProps: () => ({
      "Number of Users Requested": NUM_REQUESTED_USERS,
    })
  })

  cy.loadUserFixture()
  cy.get("@" + ALIAS_USERS_IN_FIXTURE)
      .then(usersInFixture => {
        const MAX_USERS =
          Math.min(usersInFixture.length, NUM_REQUESTED_USERS)

        const postingPromises = []
        for (let i=0; i<MAX_USERS; i++) {
          const u = usersInFixture[Number(i)]
          const p = new Cypress.Promise((resolve, reject) => {
            cy.postUser(u, NO_LOGGING).then(user => resolve(user))
          }).catch(error => {
            throw error
          })

          postingPromises.push(p)
        }

        Cypress.Promise.all(postingPromises)
            .then(postedUsers => {
              const NAMES_OF_POSTED =
                postedUsers.map(u => u.name).join(", ")

              Cypress.log({
                name: "- success",
                message: `Posted: ${NAMES_OF_POSTED}`,
                consoleProps: () => ({
                  "Posted Users": postedUsers
                })
              })

              cy.wrap(postedUsers, { log: false }).as(ALIAS_USERS_EXISTING)
            })
            .catch(error => {
              throw error
            })
      })
})
