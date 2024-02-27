/// <reference types="cypress"/>
/// <reference types="cypress-if" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import "cypress-real-events";

// Selector
const toCreateTeamMenuBtn = "#home_intro_createTeam_button"
const createTeamMenu = ".ModalCreateTeam_container__3OBH3"
const createTeamNameTextField = "#createTeam_name_text_field"
const createTeamDescTextField = "#createTeam_desc_text_field"
const teamTypeRadioBtn = '[type="radio"]'
const submitNewTeamBtn = "#createTeam_create_button"
const closeCreateNewTeamMenu = "[data-testid='CloseIcon']"
const berandaTextNavbar = ".HomeSubNavHeader_title__text__3ITET"
const slidingNotification = "#notistack-snackbar"
const teamCardTitleName = ".Card_cardTitle__FH_YD > h1"
const teamCardLink = ".Card_link__YL79H"
const teamTitleOnDashboardTeam = ".GeneralSubNavBar_title__text__3UFWr > h1"

// New Team data
const generateRandomString = function () {
    return Math.random().toString(20).substr(2, 6)
}
const newTeamName = generateRandomString(20)
const newTeamDesc = generateRandomString(20)
const newTeamType = "Proyek Multi Divisi"

// Step Def
When(`User select Buat Tim on dashboard company page`, () => {
    cy.get(toCreateTeamMenuBtn)
        .should('be.visible')
        .click()
});

Then(`User on create new team menu`, () => {
    cy.get(createTeamMenu).should('be.visible')
});

When(`User close create tim menu`, () => {
    cy.get(closeCreateNewTeamMenu)
        .should('be.visible')
        .click()
});

Then(`User back to dasboard company`, () => {
    cy.get(berandaTextNavbar).should('be.visible')
});

When(`User submit create team form`, () => {
    cy.get(submitNewTeamBtn)
        .should('be.visible')
        .click()
});

Then(`User should see the error team name required`, () => {
    cy.get(slidingNotification)
        .should('be.visible')
        .and('contain', 'Team name required')
});

Then(`User should see the error team description required`, () => {
    cy.get(slidingNotification)
        .should('be.visible')
        .and('contain', 'Team description required')
});

When(`User fills name fields on create team form`, () => {
    cy.get(createTeamNameTextField).clear().type(newTeamName)
});

When(`User fills description fields on create team form`, () => {
    cy.get(createTeamDescTextField).clear().type(newTeamDesc)
});

When(`User complete fill out the create team form`, () => {
    cy.get(createTeamNameTextField).clear().type(newTeamName)
    cy.get(createTeamDescTextField).clear().type(newTeamDesc)
    cy.radioButtonCreateNewTeam(teamTypeRadioBtn, newTeamType)
});

When(`User success create new team`, () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    cy.wait(2000)
    cy.get(teamCardTitleName, { timeout: 2000 }).should('be.visible')
    cy.get(teamCardTitleName).then(($card) => {
        if ($card.text().includes(newTeamName)) {
            cy.log('Your success create new team : ', newTeamName)
            cy.get(teamCardLink)
                .should('be.visible')
                .click()
        } else {
            cy.log('No team yet')
        }
    })

    cy.wait(2000)
    cy.get(teamTitleOnDashboardTeam, { timeout: 4000 }).should('be.visible')
    cy.get(teamTitleOnDashboardTeam).then(($teamNameDashboard) => {
        if ($teamNameDashboard.text().includes(newTeamName)) {
            cy.log("You are in dasboard team", $teamNameDashboard.text())
        } else {
            cy.log('You are in wrong dasboard team')
        }
    })
});