const { defineConfig } = require("cypress");
const { beforeEach } = require("mocha");
require("dotenv").config();
const cucumber = require("cypress-cucumber-preprocessor").default;


module.exports = defineConfig({
  
  video: true,
  env: {
    company: "PT Makmur Sejahtera",
    login_token: process.env.JWT_TOKEN,

  },

  e2e: {
    setupNodeEvents(on, config) {

      on("file:preprocessor", cucumber());
      
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "https://staging.cicle.app/",
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 2,
    },
  },

  on: {
    beforeEach: () => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
    },
  },
});
