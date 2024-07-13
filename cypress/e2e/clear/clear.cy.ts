/// <reference types="cypress" />

describe("Clear Database", () => {
  it("should clear database", () => {
    cy.request("POST", "http://20.81.238.113:3000/api/v1/clearData");
  });
});
