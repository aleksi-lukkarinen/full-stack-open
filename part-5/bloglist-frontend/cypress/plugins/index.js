/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)


function initConfig(config) {
  const c = {}

  c.defaultCommandTimeout = 10000

  c.baseUrl = "http://localhost:3000/"
  c.urlApiBase = c.baseUrl + "api/"
  c.urlApiTesting = c.urlApiBase + "testing/"
  c.urlApiTestingReset = c.urlApiTesting + "reset"
  c.urlApiLogin = c.urlApiBase + "login"
  c.urlApiUsers = c.urlApiBase + "users/"
  c.urlApiBlogs = c.urlApiBase + "blogs/"

  c.colorNotificationErrorBg = "rgb(253, 236, 234)"

  return { ...config, ...c }
}


/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config = initConfig(config)

  on("task", {
    log (message) {
      console.log(message)
      return null
    }
  })

  return config
}
