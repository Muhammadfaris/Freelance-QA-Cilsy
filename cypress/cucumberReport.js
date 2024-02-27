const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./cypress/cucumber-json/",
    reportPath: "./cypress/cucumber-report",
    
    hideMetadata: true,
    disableLog:true,
    displayDuration: true,
    displayReportTime: true,
    pageTitle: "web-e2e-cicle-test",
    reportName: "web-e2e-cicle-test",
});