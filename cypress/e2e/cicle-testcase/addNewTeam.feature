Feature: Add New Team On Company Dashboard

# As a new user, should be able to create a new team on their team company


Background: User navigated to dashboard company
    Given User success login
    When User on welcome page
    And User select on Buat Perusahaan Sendiri
    And User complete fills the create company form
    And User success create new company

Scenario: Verify user should see Buat tim form pop up menu when user select Buat tim on the dashboard company page
    Given User select Buat Tim on dashboard company page
    Then User on create new team menu

Scenario: Verify user should be able to close Buat tim form pop up menu
    Given User select Buat Tim on dashboard company page
    When User on create new team menu
    And User close create tim menu
    Then User back to dasboard company

Scenario: Verify user can not create new team when user fills blank on create team form
    Given User select Buat Tim on dashboard company page
    When User on create new team menu
    And User submit create team form
    Then User should see the error team name required

Scenario: Verify user can not create new team when user only fills team name on create team form
    Given User select Buat Tim on dashboard company page
    When User on create new team menu
    And User fills name fields on create team form
    And User submit create team form
    Then User should see the error team description required

Scenario: Verify user can not create new team when user only fills team description on create team form
    Given User select Buat Tim on dashboard company page
    When User on create new team menu
    And User fills description fields on create team form
    And User submit create team form
    Then User should see the error team name required

Scenario: Verify user should be able to create new team when user complete fill out the create new team form
    Given User select Buat Tim on dashboard company page
    When User on create new team menu
    And User complete fill out the create team form
    And User submit create team form
    Then User success create new team




