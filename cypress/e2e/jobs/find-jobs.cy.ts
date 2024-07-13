/// <reference types="cypress" />

describe(
  "Find Jobs Tests",
  {
    defaultCommandTimeout: 60000,
  },
  () => {
    const baseUrl = Cypress.config().baseUrl;

    it("should create a new jobs with different job details", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Create the first job
      cy.contains("Jobs").click();
      cy.contains("Add Job").click();
      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");
      // Second stage
      cy.get("input[name=title]").click();
      cy.contains("Front end developer").click();
      cy.get("input[name=company]").type("Company");
      cy.get("input[name=jobLocation]").type("First Location");
      cy.get("input[name=type]").parent().click();
      cy.contains("Full Time").click();
      cy.get("input[name=jobPlace]").parent().click();
      cy.contains("Remote").click();
      cy.get("input[name=skills]").click();
      cy.contains("Python").click();
      cy.get("input[name=skills]").click();
      cy.contains("C++").click();
      cy.get("textarea[name=description]").type("Description");
      cy.get("button").contains("Next").click();
      // Third stage
      cy.get("button").contains("Next").click();
      // Fourth stage
      cy.get("button").contains("Next").click();
      // Fifth stage
      cy.get("button").contains("Finish").click();
      // Assert that the user is redirected to his jobs page
      cy.url().should("eq", baseUrl + "/user");

      // Create the second job
      cy.contains("Add Job").click();
      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");
      // Second stage
      cy.get("input[name=title]").click();
      cy.contains("Full stack developer").click();
      cy.get("input[name=company]").type("Company");
      cy.get("input[name=jobLocation]").type("Second Location");
      cy.get("input[name=type]").parent().click();
      cy.contains("Part Time").click();
      cy.get("input[name=jobPlace]").parent().click();
      cy.contains("On Site").click();
      cy.get("input[name=skills]").click();
      cy.contains("Python").click();
      cy.get("input[name=skills]").click();
      cy.contains("C++").click();
      cy.get("input[name=csRequired]").parent().click();
      cy.contains("Yes").click();
      cy.get("textarea[name=description]").type("Description");
      cy.get("button").contains("Next").click();
      // Third stage
      cy.get("button").contains("Next").click();
      // Fourth stage
      cy.get("button").contains("Next").click();
      // Fifth stage
      cy.get("button").contains("Finish").click();
      // Assert that the user is redirected to his jobs page
      cy.url().should("eq", baseUrl + "/user");
    });

    it("should set a filter then clear it", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=jobTitle]").type("Front end developer");
      cy.get("button").contains("Filter").click();

      cy.contains("Full stack developer").should("not.exist");

      // Clear filter
      cy.get("button").contains("Clear").click();
      cy.contains("Full stack developer").should("be.visible");
    });

    it("should search for a job title", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=jobTitle]").type("Front end developer");
      cy.get("button").contains("Filter").click();

      cy.contains("Front end developer").should("be.visible");
      cy.contains("Full stack developer").should("not.exist");
    });

    it("should search for a job location", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=jobLocation]").type("First");
      cy.get("button").contains("Filter").click();

      cy.contains("First Location").should("be.visible");
      cy.contains("Second Location").should("not.exist");
    });

    it("should search for a job type", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=jobType]").parent().click();
      cy.get("li").contains("Full Time").click();
      cy.get("body").trigger("keydown", { keyCode: 27 });
      cy.get("body").trigger("keyup", { keyCode: 27 });

      cy.get("button").contains("Filter").click();

      cy.contains("Full Time").should("be.visible");
      cy.contains("Part Time").should("not.exist");
    });

    it("should search for a job place", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=jobPlace]").parent().click();
      cy.get("li").contains("Remote").click();
      cy.get("body").trigger("keydown", { keyCode: 27 });
      cy.get("body").trigger("keyup", { keyCode: 27 });

      cy.get("button").contains("Filter").click();

      cy.contains("Remote").should("be.visible");
      cy.contains("On Site").should("not.exist");
    });

    it("should search for a job with required computer science degree", () => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      cy.contains("Find Jobs").click();

      // Set filter
      cy.get("input[name=csRequired]").parent().click();
      cy.get("li").contains("Yes").click();
      cy.get("body").trigger("keydown", { keyCode: 27 });
      cy.get("body").trigger("keyup", { keyCode: 27 });

      cy.get("button").contains("Filter").click();

      cy.get("span").contains("CS").should("be.visible");
    });
  }
);
