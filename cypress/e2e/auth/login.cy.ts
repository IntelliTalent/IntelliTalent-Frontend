/// <reference types="cypress" />

describe("Login Tests", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-in");
  });

  it("should login successfully with correct email and password", () => {
    cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should show an error with incorrect email or password", () => {
    cy.get("input[name=email]").type("wrong@example.com");
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.contains("Invalid email or password");
  });

  it("should show an error with empty email field", () => {
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();
    cy.contains("Email is required");
  });

  it("should show an error with empty password field", () => {
    cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
    cy.get("button[type=submit]").click();
    cy.contains("Password is required");
  });

  it("should show an error with invalid email format", () => {
    cy.get("input[name=email]").type("invalid-email");
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();
    cy.contains("Invalid email");
  });

  it("should redirect to sign-up page", () => {
    cy.contains("Sign up").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/auth/sign-up");
  });

  it("should redirect to forgot password page", () => {
    cy.contains("Forgot password?").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/auth/forget-password");
  });
});
