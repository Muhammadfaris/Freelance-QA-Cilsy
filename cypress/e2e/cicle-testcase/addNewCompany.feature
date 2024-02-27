Feature: Add New Company

# As a new user, should be able to create a new company
# On cucumber cypress, You can use @focus tag to run only that scenario


Background: New user success login with their credentials
    Given User success login


Scenario: Verify new user navigated to create company page when user select "Buat Perusahaan Sendiri" on welcome page
    Given User on welcome page
    When User select on Buat Perusahaan Sendiri
    Then User on create company page


Scenario: Verify user navigated to welcome page when user select back on their browser in create companies page
    Given User on welcome page
    When User select on Buat Perusahaan Sendiri
    And User on create company page
    And User select back on their browser
    Then User on welcome page

Scenario: Verify user can create new company when user on welcome page
    Given User on welcome page
    When User select on Buat Perusahaan Sendiri
    And User complete fills the create company form
    Then User success create new company