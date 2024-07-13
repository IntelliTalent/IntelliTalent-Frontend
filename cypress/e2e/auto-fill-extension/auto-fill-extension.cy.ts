/// <reference types="cypress" />

describe("Auto Fill Extension Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    // login
    cy.visit("/auth/sign-in");
    cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();

    // Wait for login to complete
    cy.url().should("not.include", "/auth/sign-in");

    // Visit the edit autofill extension page
    cy.get("button[aria-label='Open settings']").click();
    cy.contains("Edit Autofill").click();
  });

  it("should create a new field", () => {
    // Click Add Field
    cy.contains("Add Field").click();

    cy.get('input[name="key"]').type("portfolio");
    cy.get('input[name="value"]').type("https://www.google.com/");
    cy.get("button[aria-label=add-field]").click();

    // Click Submit
    cy.contains("Submit").click();

    // Check Snackbar for success message
    cy.contains("Fields updated successfully").should("be.visible");

    // Check newly created field
    cy.contains("portfolio").should("exist");
  });

  it("should delete an old field", () => {
    // Check for existing field with Key: portfolio
    cy.contains("portfolio").should("exist");

    // Click delete icon of the field with Key: portfolio
    cy.contains("portfolio").parent().parent().find("button").click();

    // Click Submit
    cy.contains("Submit").click();

    // Check Snackbar for success message
    cy.contains("Fields updated successfully").should("be.visible");

    // Check that field with Key: portfolio does not exist
    cy.contains("portfolio").should("not.exist");
  });

  it("should edit old fields", () => {
    // Click Add Field
    cy.contains("Add Field").click();

    cy.get('input[name="key"]').type("portfolio");
    cy.get('input[name="value"]').type("https://www.google.com/");
    cy.get("button[aria-label=add-field]").click();

    // Click Submit
    cy.contains("Submit").click();

    // Check Snackbar for success message
    cy.contains("Fields updated successfully").should("be.visible");

    // Check newly created field
    cy.contains("portfolio").should("exist");

    // Edit the field
    // Change address field value to: dummy
    cy.contains("portfolio").parent().find("input").clear();
    cy.contains("portfolio").parent().find("input").type("dummy");

    // Click Submit
    cy.contains("Submit").click();

    // Check Snackbar for success message
    cy.contains("Fields updated successfully").should("be.visible");

    // Check that address field has Value: dummy
    cy.contains("portfolio").should("exist");
    cy.contains("portfolio")
      .parent()
      .find("input[value=dummy]")
      .should("exist");
  });
});
