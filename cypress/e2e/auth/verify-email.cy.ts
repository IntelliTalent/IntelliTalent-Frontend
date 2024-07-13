/// <reference types="cypress" />

describe("Verify Email Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit("/verify-email?token=test-token");
  });

  it("should show loading spinner and message while processing", () => {
    cy.get("h4").should("contain", "Verifying your email...");
    cy.get("svg[class*='MuiCircularProgress-svg']").should("be.visible");
  });

  it("should show success message on successful verification", () => {
    // Mock the API call for email verification
    cy.intercept("POST", "/api/v1/auth/verify-email", {
      statusCode: 200,
      body: { user: { id: 1, name: "John Doe" }, token: "test-token" },
    }).as("verifyEmail");

    cy.wait("@verifyEmail");

    // Check for success message
    cy.get("h4").should("contain", "Email verified successfully");
    cy.get("button").contains("Continue to Home").should("be.visible");

    // Click on "Continue to Home" button and verify navigation
    cy.get("button").contains("Continue to Home").click();
    cy.url().should("eq", baseUrl + "/");
  });

  it("should show error message on API failure", () => {
    // Mock the API call to return an error
    cy.intercept("POST", "/api/v1/auth/verify-email", {
      statusCode: 400,
      body: { message: "Invalid token" },
    }).as("verifyEmail");

    cy.wait("@verifyEmail");

    // Check for error message
    cy.get("h4").should("contain", "Something went wrong");
    cy.get("button").contains("Go to Home").should("be.visible");

    // Click on "Go to Home" button and verify navigation
    cy.get("button").contains("Go to Home").click();
    cy.url().should("eq", baseUrl + "/");
  });

  it("should show error message if token is missing", () => {
    cy.visit("/verify-email");
    cy.get("h4").should("contain", "Something went wrong");
    cy.get("button").contains("Go to Home").should("be.visible");
    cy.get("button").contains("Go to Home").click();
    cy.url().should("eq", baseUrl + "/");
  });
});
