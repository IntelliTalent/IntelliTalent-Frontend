/// <reference types="cypress" />

describe("Registration Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit("/auth/sign-up");
  });

  it(
    "should register successfully as a job seeker with all valid fields",
    {
      defaultCommandTimeout: 60000,
    },
    () => {
      cy.get("input[name=firstName]").type("Beshoy");
      cy.get("input[name=lastName]").type("Seeker");

      cy.get(
        'div[aria-labelledby="Country-label mui-component-select-country"]'
      ).click();
      cy.get('li[data-value="357994:Egypt"]').click();

      cy.get(
        'div[aria-labelledby="City-label mui-component-select-city"]'
      ).click();
      cy.get('li[data-value="360997:Giza"]').click();

      cy.get("input[name=phoneNumber]").type("01273311810");
      cy.get("input[name=address]").type("38 Main St");
      cy.get("input[name=dateOfBirth]").type("2002-01-25");
      cy.get("label#user-type-label").parent().click();
      cy.contains("Job Seeker").click();
      cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");

      cy.get("input[type=file]").selectFile("cypress/fixtures/avatar.jpg", {
        force: true,
      });

      cy.get("button[type=submit]").click();

      // Assert that the user is redirected to the post signup page after successful registration
      cy.url().should("eq", baseUrl + "/auth/post-signup");
    }
  );

  it(
    "should register successfully as a recruiter with all valid fields",
    {
      defaultCommandTimeout: 60000,
    },
    () => {
      cy.get("input[name=firstName]").type("Beshoy");
      cy.get("input[name=lastName]").type("Recruiter");

      cy.get(
        'div[aria-labelledby="Country-label mui-component-select-country"]'
      ).click();
      cy.get('li[data-value="357994:Egypt"]').click();

      cy.get(
        'div[aria-labelledby="City-label mui-component-select-city"]'
      ).click();
      cy.get('li[data-value="360997:Giza"]').click();

      cy.get("input[name=phoneNumber]").type("01273311810");
      cy.get("input[name=address]").type("38 Main St");
      cy.get("input[name=dateOfBirth]").type("2002-01-25");
      cy.get("label#user-type-label").parent().click();
      cy.contains("Recruiter").click();
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");

      cy.get("input[type=file]").selectFile("cypress/fixtures/avatar.jpg", {
        force: true,
      });

      cy.get("button[type=submit]").click();

      // Assert that the user is redirected to the post signup page after successful registration
      cy.url().should("eq", baseUrl + "/auth/post-signup");
    }
  );

  it(
    "should show error message if email already exists",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.get("input[name=firstName]").type("Beshoy");
      cy.get("input[name=lastName]").type("Recruiter");

      cy.get(
        'div[aria-labelledby="Country-label mui-component-select-country"]'
      ).click();
      cy.get('li[data-value="357994:Egypt"]').click();

      cy.get(
        'div[aria-labelledby="City-label mui-component-select-city"]'
      ).click();
      cy.get('li[data-value="360997:Giza"]').click();

      cy.get("input[name=phoneNumber]").type("01273311810");
      cy.get("input[name=address]").type("38 Main St");
      cy.get("input[name=dateOfBirth]").type("2002-01-25");
      cy.get("label#user-type-label").parent().click();
      cy.contains("Recruiter").click();
      cy.get("input[name=email]").type("bosha369@gmail.com");
      cy.get("input[name=password]").type("Bb#123456789");

      cy.get("input[type=file]").selectFile("cypress/fixtures/avatar.jpg", {
        force: true,
      });

      cy.get("button[type=submit]").click();

      cy.contains(
        "User with this email already exists or wait for the email verification to complete"
      );
    }
  );

  it("should show error with missing required fields", () => {
    cy.get("button[type=submit]").click();
    cy.contains("First name is required");
    cy.contains("Last name is required");
    cy.contains("Country is required");
    cy.contains("City is required");
    cy.contains("Phone number is required");
    cy.contains("Address is required");
    cy.contains("Date of birth is required");
    cy.contains("User type is required");
    cy.contains("Email is required");
    cy.contains("Password is required");
  });

  it("should show error with invalid email format", () => {
    cy.get("input[name=email]").type("invalid-email");
    cy.get("input[name=password]").type("SecureP@ssw0rd");

    cy.get("button[type=submit]").click();

    cy.contains("Invalid email");
  });

  it("should show error with a password that does not meet requirements", () => {
    cy.get("input[name=email]").type("john.doe@example.com");
    cy.get("input[name=password]").type("short");

    cy.get("button[type=submit]").click();

    cy.contains("Password must be at least 8 characters");
  });

  it("should navigate to login page when 'Log in' link is clicked", () => {
    cy.contains("Log in").click();
    cy.url().should("eq", baseUrl + "/auth/sign-in");
  });
});
