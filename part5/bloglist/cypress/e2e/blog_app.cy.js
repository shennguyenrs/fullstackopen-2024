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

  describe("when logged in", () => {
    beforeEach(() => {
      cy.get('input[name="username"]').type('admin');
      cy.get('input[name="password"]').type('adminpassword');
      cy.get('button').contains('Login').click();
      cy.get('p').contains('Admin logged in').should('be.visible');
    });

    it("a new blog can be created", () => {
      cy.get('button').contains('New blog').click();
      cy.get('input[name="title"]').type('Title 1');
      cy.get('input[name="author"]').type('Author 1');
      cy.get('input[name="url"]').type('https://example.com/1');
      cy.get('button').contains('Create').click();

      cy.get('p.success').contains('A new blog Title 1 by Author 1 added').should('be.visible');
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');

      cy.reload()

      cy.get('p.title').contains('Title 1 Author 1').should('be.visible');
    })
  })
});
