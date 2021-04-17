/* eslint-disable linebreak-style */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (body) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
