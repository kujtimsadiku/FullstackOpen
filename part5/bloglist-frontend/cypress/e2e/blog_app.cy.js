describe('Blog', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000');
  });

  it('Login form can be opened', function() {
    cy.contains('Login').click();
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
    cy.contains('Cancel');
  });

  it('User can log in', function() {
    cy.contains('Login').click();

    cy.get('#username').type('kute');
    cy.get('#password').type('123');
    cy.get('#login-button').click();

    cy.contains('kujtim is logged in');
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click();

      cy.get('#username').type('kute');
      cy.get('#password').type('123');
      cy.get('#login-button').click();
  
      cy.contains('kujtim is logged in');
      cy.contains('Create Blog');
    });

    it('a new blog can be created', function() {
      cy.contains('Create Blog').click();

      cy.contains('title:');
      cy.get('#title-input').type('Around the world');

      cy.contains('author:');
      cy.get('#author-input').type('Test McAfee');

      cy.contains('url:');
      cy.get('#url-input').type('https://test.com');

      cy.get('.create-btn').click();

      cy.contains('A new blog Around the world by Test McAfee');
      cy.contains('Around the world - Test McAfee');
    });
  })
})