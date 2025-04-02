describe('Quiz End-to-End Tests', () => {
  beforeEach(() => {
    // Intercept the API call to ensure consistent test data
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/');
  });

  it('should allow user to take a complete quiz', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Verify first question is displayed
    cy.contains('What is the virtual DOM in React?').should('be.visible');
    
    // Select the first answer (which is correct in our fixture)
    cy.get('.btn-primary').first().click();
    
    // Verify second question is displayed
    cy.contains('What is Express.js?').should('be.visible');
    
    // Select the third answer (which is correct for the second question)
    cy.get('.btn-primary').eq(2).click();
    
    // Verify quiz completion and score
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 2/2').should('be.visible');
  });
  
  it('should handle incorrect answers properly', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Select an incorrect answer for the first question
    cy.get('.btn-primary').eq(1).click();
    
    // Select an incorrect answer for the second question
    cy.get('.btn-primary').eq(0).click();
    
    // Verify quiz completion with score 0/2
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 0/2').should('be.visible');
  });
  
  it('should allow user to take a new quiz after completion', () => {
    // Start and complete a quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.btn-primary').first().click();
    cy.get('.btn-primary').first().click();
    
    // Take a new quiz
    cy.contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    
    // Verify we're back at the first question
    cy.contains('What is the virtual DOM in React?').should('be.visible');
  });
});
