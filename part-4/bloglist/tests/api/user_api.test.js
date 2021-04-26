const config = require("../../utils/config")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const sApi = supertest(app)
const _ = require("lodash")
const FU = require("../fixture_utils")
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

    test("the inserted user matching the given information", async () => {
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

    test("username is missing", async () => {
      const userData = { name: "Test User", password: "password" }
      await postAndExpectBadRequest(userData)
    })

    test("username is not a string", async () => {
      const userData = { username: 3, name: "Test User", password: "pass" }
      await postAndExpectBadRequest(userData)
    })

    test("username is too short", async () => {
      const userData = { username: "nn", name: "Test User", password: "pass" }
      await postAndExpectBadRequest(userData)
    })

    test("username is already in use", async () => {
      const userData = {
        username: UF.testUsers[0].username,
        name: "Test User",
        password: "pass",
      }
      await postAndExpectBadRequest(userData)
    })

    test("password is missing", async () => {
      const userData = { username: "nn", name: "Test User", }
      await postAndExpectBadRequest(userData)
    })

    test("password is not a string", async () => {
      const userData = { username: "testuser", name: "Test User", password: 3 }
      await postAndExpectBadRequest(userData)
    })

    test("password is too short", async () => {
      const userData = { username: "testuser", name: "Test User", password: "ss" }
      await postAndExpectBadRequest(userData)
    })

    test("blog ID is malformed", async () => {
      const userData = {
        username: "testuser",
        name: "Test User",
        password: "ssss",
        blogs: ["sdf"] ,
      }
      await postAndExpectBadRequest(userData)
    })
  })
})

describe("A user returned from the collection", () => {
  let user = undefined

  const [untilSetupIsFinished, signalSetupFinished] =
    FU.createSignalingPromise()

  beforeEach(async () => {
    await UF.clearUserCollection()
    await UF.insertFirstTestUserToCollection()
    const users = await UFHttp.getAllUsers()
    user = users[0]
    signalSetupFinished()
  })

  const propertiesToHave = [
    ["id",            "string"],
    ["username",      "string"],
    ["name",          "string"],
    ["blogs",         "array"],
  ]

  const propertiesNotToHave =
    ["_id", "__v", "password", "passwordHash"]

  test.concurrent.each(propertiesToHave)(
    "has a property called \"%s\" of type \"%s\"",
    async (propName, expectedType) => {
      await untilSetupIsFinished
      expect(user).toHaveProperty(propName)
      const actualType = FU.objectType(_.property(propName)(user))
      expect(actualType).toBe(expectedType)
    }
  )

  test.concurrent.each(propertiesNotToHave)(
    "does not have a property called \"%s\"", async propName => {
      await untilSetupIsFinished
      expect(user).not.toHaveProperty(propName)
    }
  )
})
