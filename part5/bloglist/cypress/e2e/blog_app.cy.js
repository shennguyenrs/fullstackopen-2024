describe('blog app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('login form should shown', () => {
    cy.get('h2').contains('Login to the application').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });
});
