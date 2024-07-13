/// <reference types="cypress" />

describe("Logout Tests", () => {
  it("should log out successfully and redirect to the home page", () => {
    cy.visit("/auth/sign-in");

    cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();

    cy.get("button[aria-label='Open settings']").click();
    cy.contains("Logout").click();

    cy.contains("Signup");
    cy.contains("Login");
  });
});
