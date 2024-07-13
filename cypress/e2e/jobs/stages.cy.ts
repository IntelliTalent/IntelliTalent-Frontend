/// <reference types="cypress" />

describe(
  "Cutsom Job Stages Tests",
  {
    defaultCommandTimeout: 60000,
  },
  () => {
    const baseUrl = Cypress.config().baseUrl;

    it("should create a new job and new profile", () => {
      // login as job seeker
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the profiles page
      cy.contains("Profiles").click();

      // Create a new profile
      cy.contains("Add Profile").click();

      // First stage
      cy.get("input[name=linkedinHandle]").type("beshoymorad");
      cy.get("input[name=githubHandle]").type("beshoymorad");

      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Second stage
      cy.get("input[name=jobTitle]").click();
      cy.contains("Web developer").click();

      cy.get("input[name=yearsOfExperience]").type("5");

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

      // logout
      cy.get("button[aria-label='Open settings']").click();
      cy.contains("Logout").click();

      // ------------------------------------------------
      // login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Visit the jobs page
      cy.contains("Jobs").click();

      // Create the first job with quiz stage only
      cy.contains("Add Job").click();

      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Second stage
      cy.get("input[name=title]").click();
      cy.contains("Web developer").click();

      cy.get("input[name=company]").type("Company1");
      cy.get("input[name=jobLocation]").type("Location1");

      cy.get("input[name=type]").parent().click();
      cy.contains("Full Time").click();

      cy.get("input[name=jobPlace]").parent().click();
      cy.contains("Remote").click();

      cy.get("input[name=skills]").click();
      cy.contains("Python").click();
      cy.get("input[name=skills]").click();
      cy.contains("C++").click();

      cy.get("textarea[name=description]").type("Description1");
      cy.get("button").contains("Next").click();

      // Third stage
      cy.get("button").contains("Next").click();

      // Fourth stage
      cy.contains("Add Quiz Stage").click();
      cy.get("input[name=quizEndDate]").type("2025-01-01");

      cy.get("button").contains("Next").click();

      // Fifth stage
      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his jobs page
      cy.url().should("eq", baseUrl + "/user");

      // -------------------------------------------------------------
      // Create the second job with interview stage only
      cy.contains("Add Job").click();

      cy.contains("Next").click();
      cy.contains("Job Title").should("be.visible");

      // Second stage
      cy.get("input[name=title]").click();
      cy.contains("Web developer").click();

      cy.get("input[name=company]").type("Company2");
      cy.get("input[name=jobLocation]").type("Location2");

      cy.get("input[name=type]").parent().click();
      cy.contains("Full Time").click();

      cy.get("input[name=jobPlace]").parent().click();
      cy.contains("Remote").click();

      cy.get("input[name=skills]").click();
      cy.contains("Python").click();
      cy.get("input[name=skills]").click();
      cy.contains("C++").click();

      cy.get("textarea[name=description]").type("Description2");
      cy.get("button").contains("Next").click();

      // Third stage
      cy.get("button").contains("Next").click();

      // Fourth stage
      cy.get("button").contains("Next").click();

      // Fifth stage
      cy.contains("Add Interview Stage").click();
      cy.get("input[name=interviewEndDate]").type("2025-02-02");
      cy.get("input[name='interviewQuestions[0]']").type("First Question");
      cy.contains("Add Question").click();
      cy.get("input[name='interviewQuestions[1]']").type("Second Question");

      cy.get("button").contains("Finish").click();

      // Assert that the user is redirected to his jobs page
      cy.url().should("eq", baseUrl + "/user");
    });

    it("should apply for the first job with the newely created profile", () => {
      // Login as job seeker
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      cy.contains("Find Jobs").click();

      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='apply']")
        .click();

      cy.get("input[name=profile]").parent().click();
      cy.get("li").contains("Web developer").click();

      cy.get("button[id='apply-button']").click();
    });

    it("should deactivate the first job", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the applicants
      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");
      cy.get("div[data-field='currentStage']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Applied");
        });

      cy.contains("Jobs").click();

      // deactivate the job
      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Deactivate job")
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the applicants
      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");

      cy.get("div[data-field='currentStage']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Quiz");
        });
    });

    it("should find the quiz ready to be taken", () => {
      // login as job seeker
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the quizzes page
      cy.contains("Quizzes").click();

      cy.contains("Total Quizzes: 1").should("be.visible");
      cy.contains("Taken Quizzes: 0").should("be.visible");
      cy.contains("Waiting Quizzes: 1").should("be.visible");

      cy.contains("Web developer").click();

      cy.contains("Agree").click();

      // answer the quiz and submit
      for (let i = 0; i < 25; i++) {
        cy.get("li[aria-label='answer-1']").click();
        cy.get("button[aria-label='next'").click();
      }

      cy.contains("Are you sure you want to finish?")
        .parent()
        .find("button")
        .contains("Yes")
        .click();

      cy.url().should("include", "/quizzes");

      cy.get("div[data-field='isTaken']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Yes");
        });

      cy.contains("Total Quizzes: 1").should("be.visible");
      cy.contains("Taken Quizzes: 1").should("be.visible");
      cy.contains("Waiting Quizzes: 0").should("be.visible");
    });

    it("should move the first job to next stage", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // move the job to next stage
      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Move job to next stage")
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .contains("Final")
        .should("be.visible");

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the applicants
      cy.contains("Company1")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");
      cy.get("div[data-field='quizGrade']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("not.eq", "Not Graded Yet");
        });
    });

    it("should apply for the second job with the newely created profile", () => {
      // Login as job seeker
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      cy.contains("Find Jobs").click();

      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='apply']")
        .click();

      cy.get("input[name=profile]").parent().click();
      cy.get("li").contains("Web developer").click();

      cy.get("button[id='apply-button']").click();
    });

    it("should deactivate the second job", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the applicants
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");
      cy.get("div[data-field='currentStage']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Applied");
        });

      cy.contains("Jobs").click();

      // deactivate the job
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Deactivate job")
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the applicants
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");

      cy.get("div[data-field='currentStage']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Interview");
        });
    });

    it("should find the interview ready to be taken", () => {
      // Mock API calls
      cy.intercept("POST", "/api/v1/uploader/upload", {
        link: "https://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg",
      });

      // login as job seeker
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the interviews page
      cy.contains("Interviews").click();

      cy.contains("Total Interviews: 1").should("be.visible");
      cy.contains("Taken Interviews: 0").should("be.visible");
      cy.contains("Waiting Interviews: 1").should("be.visible");

      cy.contains("Web developer").click();

      cy.contains("Agree").click();

      // Fill in answers and submit the form
      cy.get(".mic-toggle").should("be.visible").click(); // Start recording
      cy.get(".mic-toggle").click(); // Stop recording

      cy.get("button").contains("Next").should("not.be.disabled").click();

      // Fill in the second question and submit the form
      cy.get(".mic-toggle").click(); // Start recording
      cy.get(".mic-toggle").click(); // Stop recording
      cy.get("button").contains("Finish").should("not.be.disabled").click();

      cy.url().should("include", "/interviews");

      cy.get("div[data-field='isTaken']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Yes");
        });

      cy.contains("Total Interviews: 1").should("be.visible");
      cy.contains("Taken Interviews: 1").should("be.visible");
      cy.contains("Waiting Interviews: 0").should("be.visible");
    });

    it("should give a grade to the interviewed candidate", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // check the applicants
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");

      // go to intervierd applicants
      cy.get("button").contains("Interviewed Applicants").click();

      // select the applicant and give him a grade
      cy.contains("beshoymorad2002@gmail.com").should("be.visible").click();

      cy.get("input[name=grade]").type("90");
      cy.get("button").contains("Next").click();

      cy.get("input[name=grade]").type("90");
      cy.get("button").contains("Finish").click();

      // Wait for the filtration service to finish its processing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000);

      // check the given grade in applicants list
      cy.contains("Jobs").click();
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      cy.contains("beshoymorad2002@gmail.com").should("be.visible");
      cy.get("div[data-field='interviewGrade']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "90.00");
        });
    });

    it("should move the second job to next stage", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // move the job to next stage
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Move job to next stage")
        .parent()
        .find("button[aria-label='move-to-next']")
        .click();

      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .contains("Current Stage:")
        .find("div")
        .contains("Final");
    });

    it("should select the candidate for the job", () => {
      // Login as recruiter
      cy.visit("/auth/sign-in");
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");
      cy.get("button[type=submit]").click();

      // Wait for login to complete
      cy.url().should("not.include", "/auth/sign-in");

      // Visit the jobs page
      cy.contains("Jobs").click();

      // move the job to next stage
      cy.contains("Company2")
        .parent()
        .parent()
        .parent()
        .find("button[aria-label='view-applicants']")
        .click();

      // go to select applicants page
      cy.get("button").contains("Select Applicants").click();

      // select the candidate
      cy.contains("beshoymorad2002@gmail.com").should("be.visible").click();
      cy.get("button").contains("Yes").click();

      // check the selected candidate
      cy.contains("beshoymorad2002@gmail.com").should("be.visible");
      cy.get("div[data-field='currentStage']")
        .should("be.visible")
        .then(($divs) => {
          const lastDiv = $divs.last();
          cy.wrap(lastDiv).invoke("text").should("eq", "Selected");
        });
    });
  }
);
