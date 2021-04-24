const config = require("../../utils/config")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const sApi = supertest(app)
const _ = require("lodash")
const UF = require("../user_fixture")
const UFHttp = UF.httpUtils(sApi)


afterAll(async () => {
  await mongoose.connection.close()
})


test("Users are returned as JSON", async () => {
  await sApi
    .get(config.URL_API_USERS)
    .expect(config.HTTP_STATUS_OK)
    .expect("Content-Type", /application\/json/)
})


describe("Inserting a user to the collection", () => {
  describe("with valid information results in", () => {
    const userInfoToInsert = UF.testUsers[1]
    let usersAfterInsert = undefined
    let insertedUser = undefined

    beforeAll(async () => {
      await UF.clearUserCollection()
      await UF.insertFirstTestUserToCollection()
      await UFHttp.postNewUser(userInfoToInsert)
        .expect(config.HTTP_STATUS_CREATED)
      usersAfterInsert = await UFHttp.getAllUsers()
      insertedUser = usersAfterInsert.find(b =>
        b.username === userInfoToInsert.username)
    })

    test("the number of users increasing by 1", async () => {
      expect(usersAfterInsert).toHaveLength(1 + 1)
    })

    test("the inserted user having an ID", async () => {
      expect(insertedUser.id).toBeDefined()
    })

    test("the inserted user having correct information", async () => {
      expect(insertedUser).toBeDefined()
      expect(insertedUser.name).toBe(userInfoToInsert.name)
    })
  })

  describe("results in HTTP 400 when", () => {
    beforeAll(async () => {
      await UF.clearUserCollection()
      await UF.insertFirstTestUserToCollection()
    })

    async function postAndExpectBadRequest(userInfoToInsert) {
      await UFHttp.postNewUser(userInfoToInsert)
        .expect(config.HTTP_STATUS_BAD_REQUEST)
    }

    test("the username is missing", async () => {
      const userData = { name: "Test User", password: "password" }
      await postAndExpectBadRequest(userData)
    })

    test("the username is not a string", async () => {
      const userData = { username: 3, name: "Test User", password: "pass" }
      await postAndExpectBadRequest(userData)
    })

    test("the username is too short", async () => {
      const userData = { username: "nn", name: "Test User", password: "pass" }
      await postAndExpectBadRequest(userData)
    })

    test("the username is already in use", async () => {
      const userData = {
        username: UF.testUsers[0].username,
        name: "Test User",
        password: "pass",
      }
      await postAndExpectBadRequest(userData)
    })

    test("the password is missing", async () => {
      const userData = { username: "nn", name: "Test User", }
      await postAndExpectBadRequest(userData)
    })

    test("the password is not a string", async () => {
      const userData = { username: "testuser", name: "Test User", password: 3 }
      await postAndExpectBadRequest(userData)
    })

    test("the password is too short", async () => {
      const userData = { username: "testuser", name: "Test User", password: "ss" }
      await postAndExpectBadRequest(userData)
    })
  })
})

describe("A user returned from the collection", () => {
  let entryKeys = undefined

  beforeEach(async () => {
    await UF.clearUserCollection()
    await UF.insertFirstTestUserToCollection()
    const users = await UFHttp.getAllUsers()
    entryKeys = _.keys(users[0])
  })

  test("has a property called \"id\"", async () => {
    expect(entryKeys).toContain("id")
  })

  test("does not have a property called \"_id\"", async () => {
    expect(entryKeys).not.toContain("_id")
  })

  test("has a property called \"username\"", async () => {
    expect(entryKeys).toContain("username")
  })

  test("has a property called \"name\"", async () => {
    expect(entryKeys).toContain("name")
  })

  test("does not have a property called \"password\"", async () => {
    expect(entryKeys).not.toContain("password")
  })

  test("does not have a property called \"passwordHash\"", async () => {
    expect(entryKeys).not.toContain("passwordHash")
  })

  test("does not have a property called \"__v\"", async () => {
    expect(entryKeys).not.toContain("__v")
  })
})
