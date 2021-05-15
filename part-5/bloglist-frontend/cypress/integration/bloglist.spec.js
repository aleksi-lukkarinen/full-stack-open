/*
  These tests expect the langauge to be English
  and do not set the language when beginning
*/

describe("The blog list", () => {
  beforeEach(() => {
    cy.resetDB().then(() => {
      cy.postDefaultUsers(1)
      cy.get("@existingUsers").then(existingUsers => {
        cy.postLogin(existingUsers[0])
        cy.get("@loggedInUser").then(loggedInUser => {
          cy.postDefaultBlogs(6, loggedInUser)
          cy.get("@existingBlogs").then(() => {
            cy.openMainPage()
          })
        })
      })
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it("should have descending order by like counts", () => {
    cy.get(".blogListContainer").as("blContainer")

    const origTitleOrder = []
    cy.get("@blContainer").find(".blogTitle")
        .each(elem => {
          origTitleOrder.push(elem.text())
        })
        .then(() => {
          const blogInfo = []
          origTitleOrder.forEach((title, blogCount) => {
            const info = { title, likes: blogCount }
            blogInfo.push(info)

            cy.log()
            cy.log(`START LIKING: ${info.likes} for "${info.title}"`)

            if (info.likes > 0) {
              cy.get("@blContainer").contains(info.title)
                  .parent().parent().as("blItem")

              cy.get("@blItem").contains("Show").click()

              cy.get("@blItem").contains("Like").as("cmdLike")
              cy.get("@blItem").find(".blogLikes").as("blogLikes")

              const msgInfo = `Increased Likes for Blog ${blogCount}`
              for (let n=1; n<=info.likes; n++) {
                cy.get("@cmdLike").click()
                cy.get("@blogLikes").should(elem => {
                  // eslint-disable-next-line jest/no-conditional-expect
                  expect(elem, msgInfo).to.contain(String(n))
                })
              }
            }
          })

          cy.log()
          cy.log("ORIGINAL ORDER:")
          origTitleOrder.forEach((title, idx) => {
            cy.log(`${idx}: ${title}`)
          })

          blogInfo.sort((a, b) => b.likes - a.likes)

          cy.log()
          cy.log("EXPECTED LIKE ORDER:")
          blogInfo.forEach(({ title }, idx) => {
            cy.log(`${idx}: ${title}`)
          })

          cy.log()
          cy.log("COMPARE DOCUMENT TO THE EXPECTED LIKE ORDER:")
          cy.get("@blContainer").find(".blogTitle")
              .each((blTitle, idx) => {
                const expected = blogInfo[Number(idx)].title
                const actual = blTitle.text()
                expect(actual, `${idx + 1}. item`).to.equal(expected)
              })
        })
  })
})
