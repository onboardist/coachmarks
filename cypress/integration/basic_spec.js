
describe('Basic mark', () => {
  it('opens', () => {
    cy.visit('http://localhost:10002'); // change URL to match your dev URL
    cy.wait(1000);
    cy.get('#single-btn').click();

    cy.get('.text-container .text').should('exist');
    cy.get('.action-btn').should('be.visible');
    // cy.get('.coachmark-svg').should('be.visible');
    cy.get('.glow').should('be.visible');
    cy.get('.leader-line').should('exist'); // for some reason cypress things it's not visible
  });

  it('closes on closebutton click', () => {
    cy.get('.action-btn').click();

    cy.get('.text').should('not.be.visible');
    cy.get('.action-btn').should('not.be.visible');
    // cy.get('.coachmark-svg').should('not.be.visible');
    cy.get('.glow').should('not.be.visible');
    cy.get('.leader-line').should('not.exist');
  });

  it('re-opens on button click', () => {
    cy.get('body').click();
    cy.get('#single-btn').click();

    cy.get('.text').should('exist');
    cy.get('.action-btn').should('be.visible');
    // cy.get('.coachmark-svg').should('be.visible');
    cy.get('.glow').should('be.visible');
    cy.get('.leader-line').should('exist'); // for some reason cypress things it's not visible
  });
});
