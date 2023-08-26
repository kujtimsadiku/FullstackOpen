describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user = {
      name: 'kujtim',
      username: 'kute',
      password: '123',
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.visit('');
  });

  it('Login form can be opened', function () {
    cy.contains('Login').click();
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
    cy.contains('Cancel');
  });

  describe('Login', function () {
    it('fail with wrong credentials', function () {
      cy.contains('Login').click();

      cy.get('#username').type('kute');
      cy.get('#password').type('321');
      cy.get('#login-button').click();

      cy.get('.error-message')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'kujtim is logged in');
    });

    // not using login command for the cause of the test that the button works for loggin
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click();

      cy.get('#username').type('kute');
      cy.get('#password').type('123');
      cy.get('#login-button').click();

      cy.contains('kujtim is logged in');
    });
  });

  describe('When logged in', function () {
    let blog;
    beforeEach(function () {
      cy.login({ username: 'kute', password: '123' });

      blog = {
        title: 'Around the world',
        author: 'Test McAfee',
        url: 'www.test.com',
      };
    });

    it('blog can be created', function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
      });

      cy.contains('Around the world - Test McAfee');
    });

    it('blog can be liked', async function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
      });

      cy.contains('view').click();

      cy.contains('like').click().wait(1000).click().wait(1000).click();

      cy.contains('Likes: 3');
    });

    it('blog can be removed', function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
      });

      cy.contains('view');
      cy.contains('view').click();

      cy.contains('Remove');
      cy.contains('Remove').click();

      // after removing blog should not exist anymore
      cy.contains(`${blog.title} - ${blog.author}`).should('not.exist');
    });

    it.only('blogs in the most liked order', function () {
      cy.createBlog({
        title: 'Blog 1',
        author: 'Author1',
        url: 'url1',
      });

      cy.createBlog({
        title: 'Blog 2',
        author: 'Author2',
        url: 'url2',
      });

      cy.createBlog({
        title: 'Blog 3',
        author: 'Author3',
        url: 'url3',
      });

      cy.contains('Blog 3').parent().contains('view').click();

      cy.get('.like-btn').should('be.visible');
      cy.get('.like-btn').eq(2).click().click();

      cy.get('.hide-btn').should('be.visible');
      cy.get('.hide-btn').eq(0).click();

      cy.contains('Blog 2').parent().contains('view').click();

      cy.get('.like-btn').should('be.visible');
      cy.get('.like-btn').eq(2).click().click().click();
    });
  });
});
