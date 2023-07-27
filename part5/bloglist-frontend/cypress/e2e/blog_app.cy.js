describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'kujtim',
      username: 'kute',
      password: '123',
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user);
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

  it('Log in fails with wrong password', function() {
    cy.contains('Login').click();

    cy.get('#username').type('kute');
    cy.get('#password').type('321');
    cy.get('#login-button').click();

    cy.get('.error-message').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('html').should('not.contain', 'kujtim is logged in');
  });

  // not using login command for the cause of the test that the button works for loggin
  it('User can log in', function() {
    cy.contains('Login').click();

    cy.get('#username').type('kute');
    cy.get('#password').type('123');
    cy.get('#login-button').click();

    cy.contains('kujtim is logged in');
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kute', password: '123' });
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
    });

    describe('and a blog exists', function() {
      beforeEach(function() {
        const title = 'Around the world';
        const author = 'Test McAfee';
        const url = 'https://test.com';
        const likes = 0;

        cy.createBlog({ title: title, author: author, url: url, like: likes })
        cy.contains('A new blog Around the world by Test McAfee');
        cy.contains('Around the world - Test McAfee');
      })
    })
  })
})