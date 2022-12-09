describe("burger-constructor",  () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("open popup ingredient",() => {
    cy.get('#ingredients-modal').click();
    cy.get('#title-ingredient-modal').should("exist");
    cy.get('#button-modal-close').click();
    cy.get('#title-burger-constructor').should("exist");
  });
});
