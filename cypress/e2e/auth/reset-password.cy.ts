/// <reference types="cypress" />

/// <reference types="cypress" />

describe("Reset Password Form Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit("/reset-password?token=test-token");
  });

  it("should render the form with title and input fields", () => {
    cy.get("h1").should("contain", "Create New Password");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get("button").contains("Reset Password").should("be.visible");
  });

  it("should show validation messages for empty fields", () => {
    cy.get("button").contains("Reset Password").click();
    cy.contains("Password is required").should("be.visible");
    cy.contains("Confirm password is required").should("be.visible");
  });

  it("should show error message when passwords do not match", () => {
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("differentpassword");
    cy.get("button").contains("Reset Password").click();
    cy.contains("Passwords must match").should("be.visible");
  });

  it("should submit the form successfully and navigate to sign in", () => {
    // Mock the API call for resetting password
    cy.intercept("POST", "/api/v1/auth/reset-password", {
      statusCode: 200,
      body: { message: "Password reset successful" },
    }).as("resetPassword");

    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get("button").contains("Reset Password").click();

    cy.wait("@resetPassword");

    cy.url().should("include", "/auth/sign-in");
  });

  it("should show error message on API failure", () => {
    // Mock the API call to return an error
    cy.intercept("POST", "/api/v1/auth/reset-password", {
      statusCode: 400,
      body: { message: "Invalid token" },
    }).as("resetPasswordError");

    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get("button").contains("Reset Password").click();

    cy.wait("@resetPasswordError");

    cy.contains("Invalid token").should("be.visible");
  });

  it("should show error message if token is missing", () => {
    cy.visit("/reset-password");

    cy.url().should("eq", baseUrl + "/auth/sign-in");
  });
});
