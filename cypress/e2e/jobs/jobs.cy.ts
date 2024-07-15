/// <reference types="cypress" />

describe(
  "Jobs Tests",
  {
    defaultCommandTimeout: 60000,
  },
  () => {
    const baseUrl = Cypress.config().baseUrl;

    beforeEach(() => {
      // login
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");
    });

    it("should create a new job", () => {
      // Visit the jobs page
      cy.contains("Jobs").click();

      // Create the first job with quiz stage only
      cy.contains("Add Job").click();

      cy.get("textarea[id=jobPrompt]").type(
        "TechWave Corp is seeking a Senior Backend Developer with 7-10 years of experience in Java, Spring, and Hibernate. This full-time, remote position requires strong knowledge of microservices architecture and cloud platforms like AWS or Azure. Candidates should have excellent problem-solving skills and experience with RESTful APIs and CI/CD pipelines. A Bachelor’s degree in Computer Science or a related field is required. Apply by December 15, 2024. Proficiency in English and French is preferred."
      );

      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Second stage
      cy.get("input[name=jobLocation]").type("Location");

      cy.get("input[name=education]").type("Education");

      cy.get("input[name=csRequired]").parent().click();
      cy.contains("Yes").click();

      cy.get("textarea[name=description]").type("Description1");
      cy.get("button").contains("Next").click();

      // Third stage
      cy.get(
        'div[aria-labelledby="Country-label mui-component-select-country"]'
      ).click();
      cy.get('li[data-value="357994:Egypt"]').click();

      cy.get(
        'div[aria-labelledby="City-label mui-component-select-city"]'
      ).click();
      cy.get('li[data-value="360997:Giza"]').click();

      cy.get("button").contains("Next").click();

      // Fourth stage
      cy.contains("Add Quiz Stage").click();
      cy.get("input[name=quizEndDate]").type("2025-02-01");

      cy.get("button").contains("Next").click();

      // Fifth stage
      cy.contains("Add Interview Stage").click();
      cy.get("input[name=interviewEndDate]").type("2025-03-01");
      cy.get("input[name='interviewQuestions[0]']").type("First Question");
      cy.contains("Add Question").click();
      cy.get("input[name='interviewQuestions[1]']").type("Second Question");

      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his jobs page
      cy.url().should("include", baseUrl + "/user");
    });

    it("should edit a job", () => {
      // Visit the jobs page
      cy.contains("Jobs").click();

      cy.contains("Backend Developer")
        .parent()
        .parent()
        .find("button[aria-label='edit']")
        .click();

      cy.contains("Job Title").should("be.visible");

      cy.get("input[name=title]").click();
      cy.contains("IT Specialist").click();

      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his jobs page
      cy.url().should("include", baseUrl + "/user");

      // Assert that the job was edited
      cy.contains("IT Specialist").should("be.visible");
    });

    it("should view jobs and the newly created job details", () => {
      cy.contains("Find Jobs").click();

      cy.contains("IT Specialist")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-details']")
        .click();

      cy.contains("IT Specialist").should("be.visible");
      cy.contains("Description1").should("be.visible");
      cy.contains("Location").should("be.visible");
      cy.contains("TechWave Corp").should("be.visible");
      cy.contains("IntelliTalent").should("be.visible");
      cy.contains("Spring").should("be.visible");
      cy.contains("Full Time").should("be.visible");
      cy.contains("Remote").should("be.visible");
      cy.contains("7+ years of experience").should("be.visible");
      cy.contains("Computer Science Required").should("be.visible");
    });
  }
);
