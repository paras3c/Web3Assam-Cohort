import { readDataFile, writeDataFile } from '../services/fileService.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields({ name, email, role }) {
  const errors = [];

  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    errors.push('Name must be a non-empty string.');
  }

  if (email !== undefined && !emailRegex.test(email)) {
    errors.push('Email is not valid.');
  }

  if (role !== undefined && (typeof role !== 'string' || role.trim().length === 0)) {
    errors.push('Role must be a non-empty string.');
  }

  return errors;
}

export async function getUser(req, res) {
  try {
    const data = await readDataFile();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read user data.' });
  }
}

export async function updateUser(req, res) {
  try {
    const incoming = req.body || {};

    const payload = {
      ...(incoming.name !== undefined ? { name: incoming.name } : {}),
      ...(incoming.email !== undefined ? { email: incoming.email } : {}),
      ...(incoming.role !== undefined ? { role: incoming.role } : {})
    };

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No updatable fields provided.' });
    }

    const errors = validateFields(payload);
    if (errors.length) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    const current = await readDataFile();
    const updated = { ...current, ...payload };

    await writeDataFile(updated);

    res.json({ message: 'User updated successfully.', user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user data.' });
  }
}
