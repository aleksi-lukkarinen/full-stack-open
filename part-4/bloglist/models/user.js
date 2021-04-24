// Some test data:
//   mmallik  Mikko Mallikas                                qwerty
//   ttonttu  Tiina Tonttu                                  p4ssw0rd
//   uturhap  Uuno Turhapuro                                12345
//   wheinak  Wilhelmiina-Annukka Könkkäinen-Heinäkotola    salasana1
//   psaunal  Peppiina-Oonamaija Saunalahdenpää-Ylästöinen  princess
//   mehrnst  Matias-Aleksanteri Ehrnström-Standertskjöld   pokemon

const config = require("../utils/config")
const logger = require("../utils/logger")
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")


logger.info("Setting up User database schema...")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: config.USERNAME_MIN_LENGTH,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User
