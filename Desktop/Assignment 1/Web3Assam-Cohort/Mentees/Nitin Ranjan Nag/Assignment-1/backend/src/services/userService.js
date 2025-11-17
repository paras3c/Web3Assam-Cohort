const { readUser, writeUser } = require('../utils/fileStore');

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function sanitizeString(value = '') {
  return value.toString().trim();
}

function validatePayload(payload = {}) {
  const errors = [];
  const updates = {};

  const allowedFields = ['name', 'email', 'role'];
  const providedFields = Object.keys(payload).filter((key) =>
    allowedFields.includes(key)
  );

  if (!providedFields.length) {
    errors.push('Please provide at least one updatable field: name, email, or role.');
    return { errors, updates };
  }

  if (payload.name !== undefined) {
    const name = sanitizeString(payload.name);
    if (!name) {
      errors.push('Name cannot be empty.');
    } else {
      updates.name = name;
    }
  }

  if (payload.email !== undefined) {
    const email = sanitizeString(payload.email);
    if (!EMAIL_REGEX.test(email)) {
      errors.push('Email must be a valid email address.');
    } else {
      updates.email = email.toLowerCase();
    }
  }

  if (payload.role !== undefined) {
    const role = sanitizeString(payload.role);
    if (!role) {
      errors.push('Role cannot be empty.');
    } else {
      updates.role = role;
    }
  }

  return { errors, updates };
}

function getUser() {
  return readUser();
}

function updateUser(payload) {
  const { errors, updates } = validatePayload(payload);

  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const currentUser = readUser();
  const nextUser = { ...currentUser, ...updates };

  return writeUser(nextUser);
}

module.exports = {
  getUser,
  updateUser,
};

