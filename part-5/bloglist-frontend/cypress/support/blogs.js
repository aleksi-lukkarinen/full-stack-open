
const ALIAS_BLOGS_IN_FIXTURE = "blogsInFixture"
const ALIAS_BLOGS_EXISTING = "existingBlogs"

let blogFixture = undefined



Cypress.Commands.add("loadBlogFixture", () => {
  if (blogFixture)
    return cy.wrap(blogFixture, { log: false }).as(ALIAS_BLOGS_IN_FIXTURE)

  cy.fixture("testBlogs").then(loadedBlogs => {
    blogFixture = loadedBlogs
    cy.wrap(loadedBlogs, { log: false }).as(ALIAS_BLOGS_IN_FIXTURE)
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
    url: Cypress.config("urlApiBlogs"),
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

  cy.loadBlogFixture()
  cy.get("@" + ALIAS_BLOGS_IN_FIXTURE)
      .then(blogsInFixture => {
        const MAX_BLOGS =
          Math.min(blogsInFixture.length, NUM_REQUESTED_BLOGS)

        const postingPromises = []
        for (let i=0; i<MAX_BLOGS; i++) {
          const b = blogsInFixture[Number(i)]
          const p = new Cypress.Promise((resolve, reject) => {
            cy.postBlog(b, asUser, NO_LOGGING)
                .then(blog => resolve(blog))
          })
          postingPromises.push(p)
        }

        Cypress.Promise.all(postingPromises)
            .then(postedBlogs => {
              const NAMES_OF_POSTED =
                postedBlogs.map(u => u.title).join(", ")

              Cypress.log({
                name: "- success",
                message: `Posted: ${NAMES_OF_POSTED}`,
                consoleProps: () => ({
                  "Posted Blogs": postedBlogs
                })
              })

              cy.wrap(postedBlogs, { log: false }).as(ALIAS_BLOGS_EXISTING)
            })
            .catch(error => {
              throw error
            })
      })
})
