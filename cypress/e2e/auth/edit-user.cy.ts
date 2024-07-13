/// <reference types="cypress" />

describe("Edit User Page Tests", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeEach(() => {
    // login
    cy.visit("/auth/sign-in");
    cy.get("input[name=email]").type("beshoymorad2002@gmail.com");
    cy.get("input[name=password]").type("Bb#123456789");
    cy.get("button[type=submit]").click();

    // Wait for login to complete
    cy.url().should("not.include", "/auth/sign-in");

    // Visit the edit user page
    cy.get("button[aria-label='Open settings']").click();
    cy.contains("Edit Profile").click();
  });

  it("should render the page with title and tabs", () => {
    cy.get("h1").should("contain", "Edit User");
    cy.get('button[role="tab"]')
      .contains("Edit User Information")
      .should("be.visible");
    cy.get('button[role="tab"]')
      .contains("Change Password")
      .should("be.visible");
  });

  it("should switch to 'Edit User Information' tab and display form fields", () => {
    cy.get('button[role="tab"]').contains("Edit User Information").click();
    cy.get('input[name="firstName"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="phoneNumber"]').should("be.visible");
    cy.get(
      'div[aria-labelledby="Country-label mui-component-select-country"]'
    ).should("be.visible");
    cy.get(
      'div[aria-labelledby="City-label mui-component-select-city"]'
    ).should("be.visible");
    cy.get('input[name="address"]').should("be.visible");
    cy.get('input[name="dateOfBirth"]').should("be.visible");
    cy.get("button").contains("Edit").should("be.visible");
  });

  it("should show validation messages for empty required fields in 'Edit User Information' tab", () => {
    cy.get('button[role="tab"]').contains("Edit User Information").click();

    // Clear all the fields that have existing user data
    cy.get("input[name='firstName']").clear();
    cy.get("input[name='lastName']").clear();
    cy.get("input[name='phoneNumber']").clear();
    cy.get("input[name='address']").clear();

    // Trigger validation by clicking the 'Edit' button
    cy.get("button").contains("Edit").click();

    // Check for validation messages
    cy.contains("First name is required").should("be.visible");
    cy.contains("Last name is required").should("be.visible");
    cy.contains("Phone number is required").should("be.visible");
    cy.contains("Address is required").should("be.visible");
  });

  it("should switch to 'Change Password' tab and display form fields", () => {
    cy.get('button[role="tab"]').contains("Change Password").click();
    cy.get('input[name="currentPassword"]').should("be.visible");
    cy.get('input[name="newPassword"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get("button").contains("Change").should("be.visible");
  });

  it("should show validation messages for empty required fields in 'Change Password' tab", () => {
    cy.get('button[role="tab"]').contains("Change Password").click();
    cy.get('button[type="submit"]').contains("Change").click();

    cy.contains("Current password is required").should("be.visible");
    cy.contains("New Password is required").should("be.visible");
    cy.contains("Confirm password is required").should("be.visible");
  });

  it("should show error message when passwords do not match in 'Change Password' tab", () => {
    cy.get('button[role="tab"]').contains("Change Password").click();

    cy.get('input[name="currentPassword"]').type("currentPassword123");
    cy.get('input[name="newPassword"]').type("newPassword123");
    cy.get('input[name="confirmPassword"]').type("differentPassword123");
    cy.get('button[type="submit"]').contains("Change").click();

    cy.contains("Passwords must match").should("be.visible");
  });

  it("should submit 'Change Password' form successfully", () => {
    cy.get('button[role="tab"]').contains("Change Password").click();
    cy.get('input[name="currentPassword"]').type("Bb#123456789");
    cy.get('input[name="newPassword"]').type("Bb#1234567899");
    cy.get('input[name="confirmPassword"]').type("Bb#1234567899");
    cy.get('button[type="submit"]').contains("Change").click();

    cy.contains("Hiring or Want a Job").should("be.visible");

    // Repeat the same steps to return the old password
    cy.visit("/user/edit");
    cy.get('button[role="tab"]').contains("Change Password").click();
    cy.get('input[name="currentPassword"]').type("Bb#1234567899");
    cy.get('input[name="newPassword"]').type("Bb#123456789");
    cy.get('input[name="confirmPassword"]').type("Bb#123456789");
    cy.get('button[type="submit"]').contains("Change").click();

    cy.contains("Hiring or Want a Job").should("be.visible");
  });

  it("should show error message on API failure for 'Change Password'", () => {
    cy.get('button[role="tab"]').contains("Change Password").click();

    cy.get('input[name="currentPassword"]').type("wrong-password");
    cy.get('input[name="newPassword"]').type("Bb#1234567899");
    cy.get('input[name="confirmPassword"]').type("Bb#1234567899");
    cy.get('button[type="submit"]').contains("Change").click();

    cy.contains("Invalid current password").should("be.visible");
  });

  it("should submit 'Edit User Information' form successfully", () => {
    cy.get('button[role="tab"]').contains("Edit User Information").click();

    cy.get("input[name='lastName']").clear();
    cy.get("input[name='lastName']").type("Morad");

    // Wait for the country field to be rendered
    cy.get('div[aria-labelledby="Country-label mui-component-select-country"]')
      .contains("Egypt")
      .should("be.visible");

    // Wait for the city field to be rendered
    cy.get('div[aria-labelledby="City-label mui-component-select-city"]')
      .contains("Giza")
      .should("be.visible");

    cy.get('button[type="submit"]').contains("Edit").click();

    cy.contains("Hiring or Want a Job").should("be.visible");
  });
});
