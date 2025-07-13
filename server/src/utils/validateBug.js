// validateBug.js

function validateBug(data) {
  if (!data.title || typeof data.title !== 'string') return false;
  if (!data.description || typeof data.description !== 'string') return false;
  return true;
}

module.exports = validateBug;
