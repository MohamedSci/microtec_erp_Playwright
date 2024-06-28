export class MySubscriptionsPage {
  static clickAddDomainSpaceBtn() {
    cy.wait(500);
    cy.get('div[class="plan_header"] button').should("be.visible");
    cy.get('div[class="plan_header"] button').click({force:true});
  }

}
