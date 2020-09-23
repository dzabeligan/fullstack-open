describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Elijah Balogun',
      username: 'dzabeligan',
      password: 'dzapassword',
    }
    const anotherUser = {
      name: 'Another User',
      username: 'anotherUser',
      password: 'dzapassword',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('log into application')
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('dzabeligan')
    cy.get('#password').type('dzapassword')
    cy.get('#login-button').click()

    cy.contains('Elijah Balogun logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('dzabeligan')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'red')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Elijah Balogun logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'dzabeligan', password: 'dzapassword' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('React Stories')
      cy.get('#author').type('Elijah Balogun')
      cy.get('#url').type('https://reactpatterns.com')
      cy.contains('add blog').click()

      cy.contains('React Stories')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.newBlog({ title: 'first blog', author: 'first author', url: 'url.first' })
        cy.newBlog({ title: 'second blog', author: 'second author', url: 'url.second' })
        cy.newBlog({ title: 'third blog', author: 'third author', url: 'url.third' })
      })

      it('it can be liked', function () {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').contains('like').click()

        cy.contains('likes 1')
      })

      it('it can be deleted by creator', function () {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').contains('delete').click()

        cy.should('not.contain', 'second blog')
      })

      it('it can not be deleted by user that is not the creator', function () {
        cy.contains('logout').click()
        cy.login({ username: 'anotherUser', password: 'dzapassword' })
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').should('not.contain', 'delete')
      })

      it('blogs are ordered by number of likes', function () {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').contains('like').click()

        cy.contains('second blog').contains('first blog')
      })
    })
  })
})
