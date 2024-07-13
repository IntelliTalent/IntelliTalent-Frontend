/// <reference types="cypress" />

describe("Navbar Theme Change", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should toggle between light and dark mode when theme change button is clicked", () => {
    // Initially, check if the default theme is light
    cy.get("nav").should("have.css", "border-bottom", "1px solid rgb(0, 0, 0)"); // Check initial theme setting

    // Click on the theme change button (Brightness4Icon for dark mode)
    cy.get('[aria-label="Change Theme"]').click();

    // Assert that the theme changes to dark mode
    cy.get("nav").should(
      "have.css",
      "border-bottom",
      "1px solid rgb(255, 255, 255)"
    ); // Check updated theme setting

    // Click again on the theme change button (Brightness7Icon for light mode)
    cy.get('[aria-label="Change Theme"]').click();

    // Assert that the theme changes back to light mode
    cy.get("nav").should("have.css", "border-bottom", "1px solid rgb(0, 0, 0)"); // Check back to initial theme setting
  });
});
