import {buttonOrderTest} from "../../src/utils/constain";

describe("order authorized user",  () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.visit("");
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

  it('should order authorized user', () => {
    cy.get(buttonOrderTest).click();
    cy.get('#order-number').contains("30000").should('exist');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

