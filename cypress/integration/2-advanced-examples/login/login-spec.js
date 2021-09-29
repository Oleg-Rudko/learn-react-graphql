describe("Application sing in", () => {
  it("Must sing in the app", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy='login']").click();
    cy.get("input[type='email']").type("cypress@gmail.com");
    cy.get("input[type='password']").type("test");
    cy.get("button[type='submit']").click();
  });
});
