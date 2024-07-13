/// <reference types="cypress" />

describe(
  "Profile Details Tests",
  {
    defaultCommandTimeout: 10000,
  },
  () => {
    beforeEach(() => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the profiles page
      cy.contains("Profiles").click();

      // Visit the profile details page
      cy.contains("Backend Engineer").click();
    });

    it("should have a profile with newly created details", () => {
      cy.contains("Backend Engineer").should("be.visible");
      cy.contains("3+ years of experience").should("be.visible");
      cy.contains("Arabic").should("be.visible");
      cy.contains("English").should("be.visible");

      // Go to Experience tab
      cy.get("button").contains("Experiences").click();

      cy.contains("Full Stack Developer").should("be.visible");
      cy.contains("Apes Solutions").should("be.visible");
      cy.contains("Autonomous Development Member").should("be.visible");
      cy.contains("Cairo University Eco Racing Team").should("be.visible");
      cy.contains("Web Development & Designing Intern").should("be.visible");
      cy.contains("The Sparks Foundation").should("be.visible");

      // Go to Experience tab
      cy.get("button").contains("Educations").click();

      cy.contains("Cairo University").should("be.visible");
      cy.contains("Bachelor's degree").should("be.visible");
      cy.contains("Udacity").should("be.visible");
      cy.contains("Advanced Full-Stack Web Development NanoDegree").should(
        "be.visible"
      );
      cy.contains("Advanced Cloud DevOps Course by Udacity").should(
        "be.visible"
      );

      // Go to Experience tab
      cy.get("button").contains("Projects").click();
      cy.contains("AI-Summarizer").should("be.visible");
      cy.contains("E-Commerce-NestJs").should("be.visible");
    });

    it("should create a cv", () => {
      cy.contains("Create CV").click();

      cy.contains("Successfully created CV").should("be.visible");
    });

    it("should create a cover letter", () => {
      cy.contains("Create CoverLetter").click();

      cy.get("input[name=companyName]").type("Apes Solutions");
      cy.get("button[aria-label='create-cover-letter']").click();

      cy.contains("Successfully created Cover Letter").should("be.visible");
    });
  }
);
