Feature: Group Chat Test

# As a new user, should be able to 
# send chat and delete that chat
# send attachment and delete that attachment


Background: User have team company
    Given User success login
    When User on welcome page
    And User select on Buat Perusahaan Sendiri
    And User complete fills the create company form
    And User success create new company
    And User select Buat Tim on dashboard company page
    And User on create new team menu
    And User complete fill out the create team form
    And User submit create team form
    And User success create new team


Scenario: Verify user navigated to group chat page when user select group chat card on dashboard team
    Given User select group chat on dashboard team
    Then User on group chat page


Scenario: Verify user should be able to send text chat when user on group chat
    Given User navigates to group chat page
    And User sending some text chat
    Then User success sending text chat


Scenario: Verify user should be able to delete text chat when user on group chat
    Given User navigates to group chat page
    And User sending some text chat
    And User success sending text chat
    And User delete that chat
    Then User success delete their chat


Scenario: Verify user should be able to send attachment when user on group chat
    Given User navigates to group chat page
    And User sending some attachment chat
    Then User success sending attachment chat


Scenario: Verify user should be able to delete attachment chat when user on group chat
    Given User navigates to group chat page
    And User sending some attachment chat
    And User success sending attachment chat
    And User delete that chat
    Then User success delete attachment chat
