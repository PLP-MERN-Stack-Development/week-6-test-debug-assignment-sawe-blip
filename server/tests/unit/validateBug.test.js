// validateBug.test.js

const validateBug = require('../../src/utils/validateBug');

describe('validateBug utility', () => {
  it('should return true for valid input', () => {
    const bug = {
      title: 'Bug report 1',
      description: 'Something goes wrong',
    };
    expect(validateBug(bug)).toBe(true);
  });

  it('should return false if title is missing', () => {
    const bug = { description: 'Missing title' };
    expect(validateBug(bug)).toBe(false);
  });

  it('should return false if description is missing', () => {
    const bug = { title: 'Missing description' };
    expect(validateBug(bug)).toBe(false);
  });

  it('should return false if title is not a string', () => {
    const bug = { title: 123, description: 'Wrong type' };
    expect(validateBug(bug)).toBe(false);
  });
});
