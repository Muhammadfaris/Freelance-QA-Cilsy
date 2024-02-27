/// <reference types="cypress"/>
/// <reference types="cypress-if" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import "cypress-real-events";

// Selector

// Welcome Page Selector
const welcome_pageTitle = '.WelcomePage_title__3pRtc > h1'
const welcome_createCompany_card = '#welcome_createCompany_card'

// Create Company Page Selector
const createCompanyTitle = ".WelcomeCreateCompanyPage_title__2lfoQ > h1"
const createCompanyNameTextField = "#createCompany_name_text_field"
const createCompanyDescTextField = "#createCompany_desc_text_field"
const createCompanyCreateButton = "#createCompany_create_button"
const sucessNotificationCreateNewCompany = "#notistack-snackbar"

//form questionare selector
const newUserQuestionerPopUp = ".ModalWelcomeUser_container__1qpVS"
const newUserQuestionerNameTextField = "#quetionaire_profile_fullName_text_field"
const newUserQuestionerPositionTextField = "#quetionaire_profile_status_text_field"
const newUserQuestionerPhoneNumberTextField = "#quetionaire_profile_phoneNumber_text_field"
const newUserQuestionerAgeTextField = "#quetionaire_profile_age_text_field"
const newUserQuestionerLocationTextField = "#quetionaire_profile_location_text_field"
const newUserQuestionerCountrySelect = "#quetionaire_profile_country_select"
const newUserQuestionerCountrySelectList = ".MuiMenuItem-root"
const newUserQuestionerGenderSelect = "#quetionaire_profile_gender_select"
const newUserQuestionerGenderSelectList = ".MuiList-root > li"
const newUserQuestionerKnowCicleSelect = "#quetionaire_profile_whereKnowCicle_select"
const newUserQuestionerKnowCicleSelectList = ".MuiList-root > li"
const newUserQuestionerAppUsedBeforeSelect = "#quetionaire_profile_appUsedBeforeCicle_select"
const newUserQuestionerAppUsedBeforeSelectList = ".MuiList-root > li"
const newUserQuestionerReasonUsingAppTextField = "#quetionaire_profile_reasonUsingCicle_text_field"
const newUserQuestionerTeamSizeSelect = "#quetionaire_profile_teamSizeCategory_select"
const newUserQuestionerTeamSizeSelectList = ".MuiList-root > li"
const newUserQuestionerCompanyWorkStatusSelect = "#quetionaire_profile_companyRemoteOrOfflineStatus_select"
const newUserQuestionerCompanyWorkStatusSelectList = ".MuiList-root > li"
const newUserQuestionerSubmitBtn = "#quetionaire_profile_next_button"
const sucessNotificationQuestionareNewUser = "#notistack-snackbar"

// Dashcoard Company Selector
const sceneTutorialTitle = ".SceneTutorial_title__3zBxk > h1"
const sceneTutorialNextBtn = ".SceneTutorial_buttonGroup__22J_b > .SceneTutorial_button__25o7K h1"
const sceneTutorialCheckTutoriallBtn = ".Main_iconOutlinedDefault__1CTuO > h1"
const sceneHelpNextBtn = "#inputButtonMain h1"

const companySelectPopUp = ".ModalSelectCompany_container__q5WXS"
const companySelectList = ".ModalSelectCompany_listCompanies__18prX>div"
const berandaTextNavbar = ".HomeSubNavHeader_title__text__3ITET"
const signalSlideDownDialog = "#onesignal-slidedown-dialog"
const signalSlideDownDialogAllowButton = "#onesignal-slidedown-allow-button"
const signalSlideDownDialogCancelButton = "#onesignal-slidedown-cancel-button"

const companyEdit = "[data-testid='SettingsOutlinedIcon']"
const changeCompanyProfileBtn = ".Main_iconText__f-xVC > h1"
const deleteCompanyProfileBtn = ".EditCompanyContainer_actionSection__delete__1eY06"
const confirmDeleteCompanyProfileBtn = ".DeleteCompanyPopUp_actionSection__1jP2m > #inputButtonMain > .Main_iconText__f-xVC > h1"

// data
const generateRandomString = function () {
  return Math.random().toString(20).substr(2, 6)
}
const companyName = generateRandomString(10)
const companyDesc = generateRandomString(20)

//questionare form data
const questionareUserName = "Putri"
const questionareUserPosition = "Manager"
const questionareUserPhoneNumber = "+62895348326351"
const questionareUserAge = "30"
const questionareUserLocation = "Jakarta"
const questionareUserCountry = "Indonesia"
const questionareUserGender = "Wanita"
const questionareUserKnowCicle = "Google"
const questionareUserAppUsedBefore = "Slack"
const questionareUserReasonUsingApp = "Want to try"
const questionareUserSizeTeam = "11-30 Orang"
const questionareUserCompanyStatus = "Remote Semua"

//Step Def
Given("User success login", () => {
  cy.clearAllCookies()
  cy.login()
  cy.visit("/")
  cy.wait(1500)
});

Given("User on welcome page", () => {

  // if you have company exist, delete it and create new one. To start scenarios fresh from the scracth.
  cy.get(companySelectPopUp, { timeout: 4000 })
    .if('visible')
    .then(() => {
      cy.log("You Have Company")
      cy.get(companySelectList).first().click()

      cy.get(companyEdit)
        .should('be.visible')
        .click()

      cy.get(changeCompanyProfileBtn)
        .should("be.visible")
        .click()

      cy.get(deleteCompanyProfileBtn)
        .should("be.visible")
        .click()

      cy.get(confirmDeleteCompanyProfileBtn)
        .should("be.visible")
        .click()

      cy.log("You success delete an company")
      cy.get(welcome_createCompany_card).should("be.visible")
    })
    .else()
    .then(() => {
      cy.log("You Don't Have A Company")
      cy.get(welcome_pageTitle).should('contain', 'Halo, Selamat Bergabung di Cicle!')
      cy.get(welcome_createCompany_card).should("be.visible")
    })
});

When(`User select on Buat Perusahaan Sendiri`, () => {
  cy.get(welcome_createCompany_card).click()

});

Then(`User on create company page`, () => {
  cy.get(createCompanyTitle)
    .should("be.visible")
    .and('contain', 'Yuk Buat Perusahaanmu!');
});

When(`User select back on their browser`, () => {
  cy.go('back')
});

When(`User complete fills the create company form`, () => {
  cy.get(createCompanyNameTextField).type(companyName)
  cy.get(createCompanyDescTextField).type(companyDesc)
  cy.get(createCompanyCreateButton)
    .should("be.visible")
    .click()
});

Then(`User success create new company`, () => {

  cy.get(sucessNotificationCreateNewCompany)
    .should('be.visible')
    .and('contain', 'Successfully create company user')

  cy.get(signalSlideDownDialog)
    .if('visible')
    .then(() => {
      cy.get(signalSlideDownDialogAllowButton).click()
      cy.log("Success press allow notification")
    })
    .else()
    .then(() => {
      cy.log("Already Allow Notification")
    })

  cy.get(newUserQuestionerPopUp)
    .if('visible')
    .then(() => {
      cy.get(newUserQuestionerNameTextField).should("be.visible")
      cy.get(newUserQuestionerNameTextField).clear().type(questionareUserName)

      cy.get(newUserQuestionerPositionTextField).should("exist")
      cy.get(newUserQuestionerPositionTextField).clear().type(questionareUserPosition)

      cy.get(newUserQuestionerPhoneNumberTextField).should("exist")
      cy.get(newUserQuestionerPhoneNumberTextField).clear().type(questionareUserPhoneNumber)

      cy.get(newUserQuestionerAgeTextField).should("exist")
      cy.get(newUserQuestionerAgeTextField).type(questionareUserAge)

      cy.get(newUserQuestionerLocationTextField).should("exist")
      cy.get(newUserQuestionerLocationTextField).clear().type(questionareUserLocation)

      cy.dropDownSelect(newUserQuestionerCountrySelect, newUserQuestionerCountrySelectList, questionareUserCountry)
      cy.dropDownSelect(newUserQuestionerGenderSelect, newUserQuestionerGenderSelectList, questionareUserGender)
      cy.dropDownSelect(newUserQuestionerKnowCicleSelect, newUserQuestionerKnowCicleSelectList, questionareUserKnowCicle)
      cy.dropDownSelect(newUserQuestionerAppUsedBeforeSelect, newUserQuestionerAppUsedBeforeSelectList, questionareUserAppUsedBefore)

      cy.get(newUserQuestionerReasonUsingAppTextField).should("exist")
      cy.get(newUserQuestionerReasonUsingAppTextField).clear().type(questionareUserReasonUsingApp)

      cy.dropDownSelect(newUserQuestionerTeamSizeSelect, newUserQuestionerTeamSizeSelectList, questionareUserSizeTeam)
      cy.dropDownSelect(newUserQuestionerCompanyWorkStatusSelect, newUserQuestionerCompanyWorkStatusSelectList, questionareUserCompanyStatus)

      cy.get(newUserQuestionerSubmitBtn).should("exist").click()

      cy.get(sucessNotificationQuestionareNewUser)
        .should('be.visible')
        .and('contain', 'Successfully update user')

      cy.get(sceneTutorialTitle).should("be.visible")
      cy.get(sceneTutorialNextBtn)
        .should("be.visible")
        .click()

      cy.get(sceneHelpNextBtn).should("be.visible")
      cy.get(sceneHelpNextBtn)
        .should("be.visible")
        .click()

      cy.get(companySelectList).first().click()

      cy.get(signalSlideDownDialog)
        .if('visible')
        .then(() => {
          cy.get(signalSlideDownDialogAllowButton).click()
          cy.log("Success press allow notification")

        })
        .else()
        .then(() => {
          cy.log("Already Allow Notification")

        })

      cy.get(berandaTextNavbar).should("be.visible")
    })
    .else()
    .then(() => {
      cy.get(sceneTutorialTitle).should("be.visible")
      cy.get(sceneTutorialNextBtn)
        .should("be.visible")
        .click()

      cy.get(sceneHelpNextBtn).should("be.visible")
      cy.get(sceneHelpNextBtn)
        .should("be.visible")
        .click()

      cy.get(berandaTextNavbar).should("be.visible")
    })
});