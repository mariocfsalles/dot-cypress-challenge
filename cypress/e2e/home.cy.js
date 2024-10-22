/// <reference types="cypress" />

describe('home', () => {
  it('web app deve estar online', () => {
    cy.visit('/')
    cy.title().should('eq','Front - ServeRest')
  })
})