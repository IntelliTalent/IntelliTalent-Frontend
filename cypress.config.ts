import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--use-fake-ui-for-media-stream");
          launchOptions.args.push("--use-fake-device-for-media-stream");
          launchOptions.args.push(
            "--use-file-for-fake-audio-capture=cypress/fixtures/your_sound.wav"
          );
        }

        return launchOptions;
      });

      // Run Cypress tests in a certain order
      config.specPattern = [
        "cypress/e2e/clear/clear.cy.ts",

        "cypress/e2e/main/home.cy.ts",
        "cypress/e2e/main/change-theme.cy.ts",

        "cypress/e2e/auth/register.cy.ts",
        "cypress/e2e/auth/verify-email.cy.ts",
        "cypress/e2e/auth/login.cy.ts",
        "cypress/e2e/auth/logout.cy.ts",
        "cypress/e2e/auth/forgot-password.cy.ts",
        "cypress/e2e/auth/reset-password.cy.ts",
        "cypress/e2e/auth/edit-user.cy.ts",

        "cypress/e2e/auto-fill-extension/auto-fill-extension.cy.ts",

        "cypress/e2e/jobs/stages.cy.ts",
        "cypress/e2e/jobs/find-jobs.cy.ts",
        "cypress/e2e/jobs/jobs.cy.ts",

        "cypress/e2e/profile/profile.cy.ts",
        "cypress/e2e/profile/profile-details.cy.ts",

        "cypress/e2e/clear/clear.cy.ts",
      ];
      return config;
    },
    chromeWebSecurity: false,
  },
});
