const bcrypt = require("bcrypt")
const config = require("../utils/config")
const logger = require("../utils/logger")
const User = require("../models/user")


const dummyUserData = {
  username: "will-remove-this-soon",
  name: "dummy-name",
  password: "letmein",
}

const testUsers = [
  {
    username: "mmallik",
    name: "Mikko Mallikas",
    password: "qwerty",
  },
  {
    username: "ttonttu",
    name: "Tiina Tonttu",
    password: "p4ssw0rd",
  },
  {
    username: "uturhap",
    name: "Uuno Turhapuro",
    password: "12345",
  },
  {
    username: "wheinak",
    name: "Wilhelmiina-Annukka Könkkäinen-Heinäkotola",
    password: "salasana1",
  },
  {
    username: "psaunal",
    name: "Peppiina-Oonamaija Saunalahdenpää-Ylästöinen",
    password: "princess",
  },
  {
    username: "mehrnst",
    name: "Matias-Aleksanteri Ehrnström-Standertskjöld",
    password: "pokemon",
  },
]

const NUMBER_OF_TEST_USERS = testUsers.length


async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, config.SALT_ROUNDS)
  }
  catch (error) {
    const msg = "Error while hashing a password: "
    logger.error(msg, error)
  }
}

async function prepareTestUserData(userData) {
  const username = userData.username.trim()
  const name = userData.name.trim()
  const passwordHash = await hashPassword(userData.password)

  return new User({ username, name, passwordHash })
}

async function clearUserCollection() {
  try {
    await User.deleteMany({})
  }
  catch (error) {
    const msg = "Error while clearing user collection: "
    logger.error(msg, error)
  }
}

async function insertFirstTestUserToCollection() {
  try  {
    const user = await prepareTestUserData(testUsers[0])
    await user.save()
  }
  catch (error) {
    const msg = "Error while inserting a test user to collection: "
    logger.error(msg, error)
  }
}

async function insertAllTestUsersToCollection() {
  try  {
    const promises = testUsers.map(u => prepareTestUserData(u))
    const users = await Promise.all(promises)
    await User.insertMany(users)
  }
  catch (error) {
    const msg = "Error while inserting test users to collection: "
    logger.error(msg, error)
  }
}

async function nonExistingUserId() {
  const user = await prepareTestUserData(dummyUserData)
  await user.save()
  await user.remove()

  return user._id.toString()
}

function userPathFrom(userId) {
  return `${config.URL_API_USERS}/${userId}`
}

function httpUtils(supertestApi) {

  async function getAllUsers() {
    const response =
      await supertestApi.get(config.URL_API_USERS)

    return response.body
  }

  async function getUser(idOfUserToRetrieve) {
    const response =
      await supertestApi.get(userPathFrom(idOfUserToRetrieve))

    return response.body
  }

  function postNewUser(userToInsert) {
    return supertestApi
      .post(config.URL_API_USERS)
      .send(userToInsert)
  }

  function putUserUpdateById(idOfUserToUpdate, updatedUserData) {
    return supertestApi
      .put(userPathFrom(idOfUserToUpdate))
      .send(updatedUserData)
  }

  function deleteUserById(idOfUserToDelete) {
    return supertestApi
      .delete(userPathFrom(idOfUserToDelete))
  }

  return {
    getAllUsers,
    getUser,
    postNewUser,
    putUserUpdateById,
    deleteUserById,
  }
}

module.exports = {
  NUMBER_OF_TEST_USERS,

  testUsers,

  hashPassword,
  prepareCollectionUser: prepareTestUserData,
  clearUserCollection,
  insertFirstTestUserToCollection,
  insertAllTestUsersToCollection,
  nonExistingUserId,
  httpUtils,
}
