// bug_flow.cy.js

describe('Bug Tracker Flow', () => {
  it('Should load the app and open bug report form', () => {
    cy.visit('http://localhost:5173'); // Adjust based on your client dev server port
    cy.contains('Report Bug').click(); // Adjust selector to your button
    cy.get('input[name="title"]').type('E2E Bug');
    cy.get('textarea[name="description"]').type('Bug found during E2E test');
    cy.get('button[type="submit"]').click();
    cy.contains('E2E Bug'); // Check if it's added to the list
  });
});
