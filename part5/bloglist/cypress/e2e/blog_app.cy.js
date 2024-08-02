describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Admin',
      username: 'admin',
      password: 'adminpassword',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:5173');
  });

  it('login form should shown', () => {
    cy.get('h2').contains('Login to the application').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  describe('Login', () => {
    it('should succeed with correct credentials', () => {
      cy.get('input[name="username"]').type('admin');
      cy.get('input[name="password"]').type('adminpassword');
      cy.get('button').contains('Login').click();
      cy.get('p').contains('Admin logged in').should('be.visible');
    });

    it('should fail with wrong credentials', () => {
      cy.get('input[name="username"]').type('admin');
      cy.get('input[name="password"]').type('wrong');
      cy.get('button').contains('Login').click();
      cy.get('p.error')
        .contains('Wrong username or password')
        .should('be.visible');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
