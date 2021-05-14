
const URL_BASE = "http://localhost:3000/"
const URL_API_BASE = URL_BASE + "api/"
const URL_API_TESTING = URL_API_BASE + "testing/"
const URL_API_TESTING_RESET = URL_API_TESTING + "reset"
const URL_API_LOGIN = URL_API_BASE + "login"
const URL_API_USERS = URL_API_BASE + "users/"
const URL_API_BLOGS = URL_API_BASE + "blogs/"

const COLOR_NOTIFIC_ERROR_BG = "rgb(253, 236, 234)"


Cypress.Commands.add("resetDB", () => {
  const requestData = {
    method: "POST",
    url: URL_API_TESTING_RESET,
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
    url: URL_API_USERS,
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

  cy.fixture("testUsers").then(usersInFixture => {
    const MAX_USERS =
      Math.min(usersInFixture.length, NUM_REQUESTED_USERS)

    const postingPromises = []
    for (let i=0; i<MAX_USERS; i++) {
      const u = usersInFixture[Number(i)]
      const p = new Promise((resolve, reject) => {
        cy.postUser(u, NO_LOGGING)
            .then(user => resolve(user))
      })
      postingPromises.push(p)
    }

    Promise.all(postingPromises).then(postedUsers => {
      const NAMES_OF_POSTED =
        postedUsers.map(u => u.name).join(", ")

      Cypress.log({
        name: "- success",
        message: `Posted: ${NAMES_OF_POSTED}`,
        consoleProps: () => ({
          "Posted Users": postedUsers
        })
      })

      cy.wrap(postedUsers, { log: false })
    })
  })
})



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
    url: URL_API_LOGIN,
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

    cy.wrap(loggedInUser, { log: false })
  })
})



Cypress.Commands.add("clearLogin", () => {
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



Cypress.Commands.add("postBlog", (blogToPost, asUser, shouldBeLogged) => {
  const SHOULD_LOG = shouldBeLogged !== false
    ? true : false

  if (SHOULD_LOG) {
    const { title, author, url } = blogToPost
    Cypress.log({
      name: "post blog",
      message: `${title} (${author}, ${url})`,
      consoleProps: () => ({
        "Blog to Post": blogToPost,
        "Post as User": asUser
      })
    })
  }

  const requestData = {
    method: "POST",
    url: URL_API_BLOGS,
    auth: { bearer: asUser.token },
    body: blogToPost,
    log: false
  }

  cy.request(requestData).then(response => {
    const postedBlog = response.body
    if (SHOULD_LOG) {
      Cypress.log({
        name: "success",
        message: `Blog ID: ${postedBlog.id}`,
        consoleProps: () => postedBlog
      })
    }
    cy.wrap(postedBlog, { log: false })
  })
})



Cypress.Commands.add("postDefaultBlogs", (numberOfBlogs, asUser) => {
  const NO_LOGGING = false
  const NUM_REQUESTED_BLOGS = Number.isInteger(numberOfBlogs)
    ? numberOfBlogs : 2

  Cypress.log({
    name: "post",
    message: `${NUM_REQUESTED_BLOGS} default blog(s) requested`,
    consoleProps: () => ({
      "Number of Blogs Requested": NUM_REQUESTED_BLOGS,
      "Post as User": asUser,
    })
  })

  cy.fixture("testBlogs").then(blogsInFixture => {
    const MAX_BLOGS =
      Math.min(blogsInFixture.length, NUM_REQUESTED_BLOGS)

    const postingPromises = []
    for (let i=0; i<MAX_BLOGS; i++) {
      const b = blogsInFixture[Number(i)]
      const p = new Promise((resolve, reject) => {
        cy.postBlog(b, asUser, NO_LOGGING)
            .then(blog => resolve(blog))
      })
      postingPromises.push(p)
    }

    Promise.all(postingPromises).then(postedBlogs => {
      const NAMES_OF_POSTED =
        postedBlogs.map(u => u.title).join(", ")

      Cypress.log({
        name: "- success",
        message: `Posted: ${NAMES_OF_POSTED}`,
        consoleProps: () => ({
          "Posted Blogs": postedBlogs
        })
      })

      cy.wrap(postedBlogs, { log: false })
    })
  })
})



Cypress.Commands.add("openMainPage", () => {
  Cypress.log({
    name: "main page",
    message: `Address: ${URL_BASE}`,
  })

  cy.visit(URL_BASE, { log: false })
})



Cypress.Commands.add("documentBody", () => {
  cy.get("body")
})



Cypress.Commands.add("errorNotificationIsRedAndContains", text => {
  cy.errorNotification().should(elNotif => {
    expect(elNotif, "Error Notification")
        .to.have.css("background-color", COLOR_NOTIFIC_ERROR_BG)

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
