/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference path="../support/component-tests.d.ts" />

import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Define the mock for the API call
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
  });

  it('should display Start Quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').should('be.visible');
  });

  it('should load questions when Start Quiz is clicked', () => {
    // In this test we'll skip checking for the spinner since it may appear and disappear too quickly
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');
    // Verify we've moved past the initial state
    cy.contains('button', 'Start Quiz').should('not.exist');
  });

  it('should display questions after data is loaded', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');
    cy.contains('What is the virtual DOM in React?').should('be.visible');
    cy.contains('A lightweight copy of the actual DOM').should('be.visible');
  });

  it('should increment score when correct answer is selected', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Click the button for the correct answer (first answer in our mock data is correct)
    cy.get('.btn-primary').first().click();
    
    // After the first question, we should see the second question
    cy.contains('What is Express.js?').should('be.visible');
    
    // Click the correct answer for second question (third option in our fixture)
    cy.get('.btn-primary').eq(2).click();
    
    // Should show completed screen with score 2/2
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 2/2').should('be.visible');
  });

  it('should allow taking a new quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Complete the quiz by answering both questions
    cy.get('.btn-primary').first().click();
    cy.get('.btn-primary').first().click();
    
    cy.contains('Take New Quiz').should('be.visible').click();
    cy.wait('@getQuestions');
    
    // Should show first question again
    cy.contains('What is the virtual DOM in React?').should('be.visible');
  });
});
