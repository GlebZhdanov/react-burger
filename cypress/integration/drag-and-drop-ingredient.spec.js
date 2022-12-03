describe("burger-constructor",  () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it('should drag and drop ingredient', () => {
    const dataTransfer = new DataTransfer();

    cy.get('#ingredients-modal').trigger('dragstart', {
      dataTransfer
    });

    cy.get('#container').trigger('drop', {
      dataTransfer
    });
  });

});
