/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render Main component by default when no query parameter is provided", () => {
    cy.get("h1.main-header")
      .contains("Hiring or Want a Job")
      .should("be.visible");
    cy.get("p.header-description")
      .contains("Intelli-Talent")
      .should("be.visible");
  });

  it('should render JobSeeker component when query parameter "page=Job Seeker" is provided', () => {
    cy.get("button[aria-label='Job Seeker']").click();

    cy.get("h1.main-header")
      .contains("Search, Apply & Get Your Dream Job")
      .should("be.visible");
    cy.get("p.header-description")
      .contains("Start your hunt")
      .should("be.visible");
    cy.get("h2").contains("Countless Career Options").should("be.visible");
    cy.get("button").contains("Browse Jobs").should("be.visible");
  });

  it('should render Recruiter component when query parameter "page=Recruiter" is provided', () => {
    cy.get("button[aria-label='Recruiter']").click();

    cy.get("h1.main-header")
      .contains("Want to find Talents")
      .should("be.visible");
    cy.get("p.header-description")
      .contains("Streamline your hiring process")
      .should("be.visible");
  });
});
