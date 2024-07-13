/// <reference types="cypress" />

describe(
  "Profile Tests",
  {
    defaultCommandTimeout: 60000,
  },
  () => {
    const baseUrl = Cypress.config().baseUrl;

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
    });

    it("should create a new profile", () => {
      cy.contains("Add Profile").click();

      // First stage
      cy.get("input[name=linkedinHandle]").type("beshoymorad");
      cy.get("input[name=githubHandle]").type("beshoymorad");

      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Second stage
      cy.get("input[name=jobTitle]")
        .invoke("val")
        .should("equal", "Full Stack Developer");

      cy.get("input[name=yearsOfExperience]").type("3");

      // Check skills
      cy.get("input[name=skills]").click();
      cy.contains("Python").click();
      cy.get("input[name=skills]").click();
      cy.contains("C++").click();

      cy.get("input[id=languages]").click();
      cy.contains("Arabic").click();
      cy.get("input[id=languages]").click();
      cy.contains("English").click();

      cy.get("button").contains("Next").click();
      cy.contains("School Name").should("be.visible");

      // Third stage
      cy.get("textarea[name='educations[0].description']").type(
        "Computer Engineering"
      );
      cy.get("textarea[name='educations[1].description']").type("Udacity");

      cy.get("button").contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Fourth stage
      cy.get("textarea[name='experiences[0].description']").type("Full stack");
      cy.get("textarea[name='experiences[1].description']").type("Eco Racing");
      cy.get("textarea[name='experiences[2].description']").type("Sparks");

      cy.get("button").contains("Next").click();
      cy.contains(
        "Select only the projects you are most interested in:"
      ).should("be.visible");

      // Fifth stage
      cy.contains("AI-Summarizer").click();
      cy.contains("E-Commerce-NestJs").click();
      cy.get("button[aria-label='move selected right']").click();
      cy.get("button").contains("Select").click();

      cy.get("textarea[name='projects[1].description']").type("E-Commerce");
      cy.get("button").contains("Next").click();

      cy.contains("Add Certification").should("be.visible");

      // Sixth stage
      cy.contains("Add Certification").click();

      cy.get("input[name='certifications[0].title']").type(
        "Advanced Cloud DevOps Course by Udacity"
      );
      cy.get("input[name='certifications[0].authority']").type("Udacity");
      cy.get("input[name='certifications[0].issuedAt']").type("2002-01-25");
      cy.get("input[name='certifications[0].url']").type(
        "https://www.google.com/"
      );

      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his profile page
      cy.url().should("eq", baseUrl + "/user");
    });

    it("should edit a profile", () => {
      cy.contains("Full Stack Developer")
        .parent()
        .find("button[aria-label=edit]")
        .click();

      cy.url().should("include", "/edit");

      cy.get("input[name=jobTitle]").click();
      cy.contains("Backend Engineer").click();

      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his profile page
      cy.url().should("eq", baseUrl + "/user");

      cy.contains("Backend Engineer").should("be.visible");
    });

    it("should delete a profile", () => {
      // Create a new profile
      cy.contains("Add Profile").click();

      cy.contains("Next").click();

      cy.get("input[name=jobTitle]").click();
      cy.contains("Database Analyst").click();

      cy.get("textarea[name=summary]").type("summary");

      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Finish").click();

      // Delete the newly created profile
      cy.contains("Database Analyst")
        .parent()
        .find("button[aria-label=delete]")
        .click();

      cy.get("button").contains("Delete").click();

      cy.contains("Database Analyst").should("not.exist");
    });
  }
);
