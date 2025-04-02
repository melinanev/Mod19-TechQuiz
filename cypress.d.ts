/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    mount: typeof import('cypress/react18').mount;
  }
}
