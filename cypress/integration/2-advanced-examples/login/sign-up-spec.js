describe("Application registration", () => {
  it("Must register in the app", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=sing-up]").click();
    cy.get('[data-cy="sing-up-name"]').type("Cypress");
    cy.get('[data-cy="sing-up-email"]').type("cypress@gmail.com");
    cy.get('[data-cy="sing-up-password"]').type("test");
    cy.get('[data-cy="sing-up-password-verification"]').type("test");
    cy.get('[data-cy="sing-up-age"]').type("23");
    cy.get('[data-cy="sing-up-city"]').type("New York");
    cy.get('button[type="submit"]').click();
  });
});
