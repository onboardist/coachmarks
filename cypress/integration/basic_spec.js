
describe('Basic mark', () => {
  it('opens', () => {
    cy.visit('http://localhost:10002') // change URL to match your dev URL

    cy.get('.coachmark-text').should('be.visible');
    cy.get('.coachmark-close').should('be.visible');
    cy.get('.coachmark-svg').should('be.visible');
    cy.get('.coachmark-glow').should('be.visible');
    cy.get('.coachmark-line').should('be.visible');
  });

  it('closes on closebutton click', () => {
    cy.get('.coachmark-close').click();

    cy.get('.coachmark-text').should('not.be.visible');
    cy.get('.coachmark-close').should('not.be.visible');
    cy.get('.coachmark-svg').should('not.be.visible');
    cy.get('.coachmark-glow').should('not.be.visible');
    cy.get('.coachmark-line').should('not.be.visible');
  });

  it('re-opens on button click', () => {
    cy.get('#btn').click();

    cy.get('.coachmark-text').should('be.visible');
    cy.get('.coachmark-close').should('be.visible');
    cy.get('.coachmark-svg').should('be.visible');
    cy.get('.coachmark-glow').should('be.visible');
    cy.get('.coachmark-line').should('be.visible');
  });
});
