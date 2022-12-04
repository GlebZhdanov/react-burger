import {buttonOrderTest} from "../../src/utils/constain";

describe("order authorized user",  () => {
  beforeEach(() => {
    cy.visit("");
  });

  it('should order not authorized user', () => {
    cy.get(buttonOrderTest).click();
    cy.get('#login-text').should('exist');
    cy.get('#email-input').type('testburger@mail.com')
    cy.get('#password-input').type(`123456{enter}`);
    cy.wait(1000);
    cy.get('#user').should('have.text', 'TestUserBurger');
    const dataTransfer = new DataTransfer();
    cy.get('#ingredients-modal').trigger('dragstart', {dataTransfer});
    cy.get('#container').trigger('drop', {dataTransfer});
    cy.get(buttonOrderTest).click();
    cy.wait(20000);
    cy.get('#order-number').should('exist');
  });
});

