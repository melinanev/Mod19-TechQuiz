/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    mount: typeof import('cypress/react').mount;
    intercept(method: string | RegExp, url: string | RegExp, response?: any): Chainable<null>;
    intercept(url: string | RegExp, response?: any): Chainable<null>;
    wait(alias: string): Chainable<null>;
  }
}

// Declare global testing functions
declare const describe: (description: string, callback: () => void) => void;
declare const it: (description: string, callback: () => void) => void;
declare const beforeEach: (callback: () => void) => void;
