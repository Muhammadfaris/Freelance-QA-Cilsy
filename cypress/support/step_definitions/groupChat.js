/// <reference types="cypress"/>
/// <reference types="cypress-if" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import "cypress-real-events";

// Selector
const companySelectList = ".ModalSelectCompany_listCompanies__18prX>div"
const teamCardTitleName = ".Card_cardTitle__FH_YD > h1"
const teamCardLink = ".Card_link__YL79H"
const teamTitleOnDashboardTeam = ".GeneralSubNavBar_title__text__3UFWr > h1"
const groupChatCard = ":nth-child(1) > :nth-child(1) > .LinkNoDecor_Link__3DEkL > .BoxMenu_container__1flgD"
const groupChatSendBtn = "#groupChat_message_send_button"
const chatTextField = ".fr-element > p"
const valuechat = ".Message_content__21YIN > :nth-child(1)"

const timeInChatBox = ".Message_timeStamp__2XRSu"
const groupChatMsgDropDown = "#groupChat_message_dropdown"
const deletePopUpMenuBtn = "[data-testid='DeleteOutlinedIcon']"
const deleteConfirmationYesBtn = "#groupChat_message_delete_popup_confirmation_yes_button"
const slideNotification = "#notistack-snackbar"
const attachmentBtn = "input[type=file]"
const msgIconAttachmentOnChatBox = ".Message_attachment__icon__2DYyN > a"
const msgTitleAttachmentOnChatBox = ".Message_attachment__title__2UFxF > a"



// chat generator
const generateRandomString = function () {
    return Math.random().toString(20).substr(2, 6)
}
const userChatText = generateRandomString(20)

// Step Def
When(`User on team dashboard`, () => {
    cy.get(companySelectList).first().click()

    cy.wait(1500)
    cy.get(teamCardLink)
        .should('be.visible')
        .click()

    cy.wait(1500)
    cy.get(teamTitleOnDashboardTeam, { timeout: 4000 }).should('be.visible')
});

Given(`User select group chat on dashboard team`, () => {
    cy.get(groupChatCard)
        .should('be.visible')
        .click()
});

Then(`User on group chat page`, () => {
    cy.get(groupChatSendBtn).should('be.visible')
});

Then(`User navigates to group chat page`, () => {
    cy.get(groupChatCard)
        .should('be.visible')
        .click()
    cy.get(groupChatSendBtn, { timeout: 2000 }).should('be.visible')

});

When(`User sending some text chat`, () => {
    cy.get(chatTextField).type(userChatText, { force: true })
    cy.get(groupChatSendBtn)
        .should('be.visible')
        .click()
});

Then(`User success sending text chat`, () => {
    cy.wait(1000)
    cy.get(valuechat).first().should('have.text', userChatText)

});

When(`User delete that chat`, () => {
    cy.get(timeInChatBox).realHover()
    cy.get(groupChatMsgDropDown).click()
    cy.get(deletePopUpMenuBtn).should("be.visible").click()
    cy.get(deleteConfirmationYesBtn).should('be.visible').click()
});

Then(`User success delete their chat`, () => {
    cy.get(slideNotification, { timeout: 2000 }).should('have.text', 'Delete group chat message success')
});

When(`User sending some attachment chat`, () => {
    cy.get(attachmentBtn).selectFile("cypress/assets/reddot.jpg", { force: true })
});

Then(`User success sending attachment chat`, () => {
    cy.wait(1000)
    cy.get(slideNotification).should('have.text', 'Upload attachments is success')
    cy.get(msgIconAttachmentOnChatBox)
        .first()
        .invoke('attr', 'href')
        .then(href => {
            cy.request(href).its('status').should('eq', 200)
        })
    cy.get(msgTitleAttachmentOnChatBox)
        .first()
        .should('have.text', 'Unduh')
        .invoke('attr', 'href')
        .then(href => {
            cy.request(href).its('status').should('eq', 200)
        })
});

Then(`User success delete attachment chat`, () => {
    cy.get(slideNotification, { timeout: 2000 }).should('have.text', 'Delete group chat attachment success')

});