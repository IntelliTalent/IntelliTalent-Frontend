/// <reference types="cypress" />

describe("Forgot Password Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit("/auth/forget-password");
  });

  it("should display validation errors for empty email field", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required");
  });

  it("should display validation errors for invalid email", () => {
    cy.get('[name="email"]').type("invalid-email");
    cy.get('button[type="submit"]').click();
    cy.contains("Invalid email");
  });

  it("should submit the form successfully and display success message", () => {
    // Mock the API call
    cy.intercept("POST", "/api/v1/auth/forget-password", {
      statusCode: 200,
      body: { message: "Reset password link sent to your email!" },
    }).as("forgetPassword");

    cy.get('[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();

    cy.wait("@forgetPassword");

    // Check for success Snackbar
    cy.contains("Reset password link sent to your email!");

    // Verify redirection after 3 seconds
    cy.url().should("eq", baseUrl + "/");
  });

  it("should display error message on API failure", () => {
    // Mock the API call to return an error
    cy.intercept("POST", "/api/v1/auth/forget-password", {
      statusCode: 400,
      body: { message: "Error sending reset link." },
    }).as("forgetPassword");

    cy.get('[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();

    cy.wait("@forgetPassword");

    // Check for error message
    cy.get("svg[data-testid='ErrorOutlineIcon']").should("be.visible");
    cy.contains("Error sending reset link.").should("be.visible");
  });

  it("should navigate to sign-in page when clicking on 'Back to Sign In' link", () => {
    cy.contains("Back to Sign In").click();
    cy.url().should("eq", baseUrl + "/auth/sign-in");
  });
});
