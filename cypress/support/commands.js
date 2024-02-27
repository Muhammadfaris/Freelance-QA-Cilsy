// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("login", () => {
  cy.window().then((win) => {
    win.localStorage.setItem("token", Cypress.env("login_token")); //'login-token' cannot declare as varibale on config.js, that's why we use '_' separator.
  });
});

Cypress.Commands.add("dropDownSelect", (selectorMenuList, selectorLi, choosen) => {
  cy.get(selectorMenuList).click()

  cy.get(selectorLi).each(function ($ele) {
    if ($ele.text() === choosen) {
      cy.log("found element")
      cy.wrap($ele).click()
      cy.log('You choose', $ele.text())

    } else {
      cy.log('current value', $ele.text())
    }
  })
});

Cypress.Commands.add("radioButtonCreateNewTeam", (selectorRadio, optionValueRadio) => {
  switch (optionValueRadio) {
    case "Proyek Multi Divisi":
      cy.get(selectorRadio).check("project")
      break;
    case "Divisi/Departemen Utama":
      cy.get(selectorRadio).check("team")
      break;
    case "Kantor Pusat":
      cy.get(selectorRadio).check("hq")
      break;
  }
});


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
