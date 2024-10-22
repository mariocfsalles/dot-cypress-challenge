Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', Cypress.env('apiUrl') + '/login', {
    email,
    password
  }).then((response) => {
    window.localStorage.setItem('serverest/userEmail', email);
    window.localStorage.setItem('serverest/userToken', response.body.authorization);
  });
});
