describe('Bug Reporting Flow', () => {
  const baseUrl = 'http://localhost:3000'; // Adjust if your app uses a different port

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should create a new bug', () => {
    cy.visit(`${baseUrl}/bugs/new`);
    cy.get('input[name="title"]').type('E2E Bug Title');
    cy.get('textarea[name="description"]').type('Found during E2E test');
    cy.get('button[type="submit"]').click();
    cy.contains('E2E Bug Title');
  });

  it('should update bug status', () => {
    cy.visit(`${baseUrl}/bugs`);
    cy.contains('E2E Bug Title').click();
    cy.get('select[name="status"]').select('in-progress');
    cy.get('button.update-status').click();
    cy.contains('Status: in-progress');
  });

  it('should delete the bug', () => {
    cy.visit(`${baseUrl}/bugs`);
    cy.contains('E2E Bug Title').click();
    cy.get('button.delete-bug').click();
    cy.contains('Bug deleted successfully');
  });
});
