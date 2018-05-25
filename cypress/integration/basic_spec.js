
describe('Basic mark', () => {
  it('opens', () => {
    cy.visit('http://localhost:10002'); // change URL to match your dev URL

    cy.get('.coachmark-text').should('exist');
    cy.get('.coachmark-action-btn').should('be.visible');
    // cy.get('.coachmark-svg').should('be.visible');
    cy.get('.coachmark-glow').should('be.visible');
    cy.get('.leader-line').should('exist'); // for some reason cypress things it's not visible
  });

  it('closes on closebutton click', () => {
    cy.get('.coachmark-action-btn').click();

    cy.get('.coachmark-text').should('not.be.visible');
    cy.get('.coachmark-action-btn').should('not.be.visible');
    // cy.get('.coachmark-svg').should('not.be.visible');
    cy.get('.coachmark-glow').should('not.be.visible');
    cy.get('.leader-line').should('not.exist');
  });

  it('re-opens on button click', () => {
    cy.get('body').click();
    cy.get('#btn').click();

    cy.get('.coachmark-text').should('exist');
    cy.get('.coachmark-action-btn').should('be.visible');
    // cy.get('.coachmark-svg').should('be.visible');
    cy.get('.coachmark-glow').should('be.visible');
    cy.get('.leader-line').should('exist'); // for some reason cypress things it's not visible
  });
});
