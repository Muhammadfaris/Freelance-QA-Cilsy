## Packages

here are the packages need to be install before running the project

1. dotenv
   `yarn add dotenv`
   - after install dotenv then create a .env file to store token.
   - create varibale JWT_TOKEN= `input your JWT Token` on .env file
   - adding login_token: process.env.JWT_TOKEN in your cypress.config.js
   
2. cucumber
   `yarn add cypress-cucumber-preprocessor `
3. cypress real event
   `yarn add cypress-real-events`
4. cypress-if
   `yarn add -D cypress-f`
5. multiple-cucumber-html-reporter
   `npm install multiple-cucumber-html-reporter --save`

## How to run the project

install cypress version `yarn add cypress@13.6.4 --dev`
open cypress `yarn run cypress open`
select E2E testing then select .feature file

if you want run with CLI : 
`yarn run <see the scripcts on package.json to see what spec do you want to run>`

After running spec, generate report :
`yarn run generate-cucumber-report`

Open the report cypress\cucumber-report\index.html with browser.

## Notes

1. Add new testcases in e2e directory with feature file using the gherkins syntax
2. Cypress commands can be edited in support/step_definitions directory
"# Freelance-QA-Cilsy" 
"# Freelance-QA-Cilsy" 
