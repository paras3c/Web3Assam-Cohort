const fs = require('fs');
const path = require('path');

const DATA_DIRECTORY = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIRECTORY, 'data.json');

const DEFAULT_USER = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Developer',
};

function ensureFile() {
  if (!fs.existsSync(DATA_DIRECTORY)) {
    fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_USER, null, 2), 'utf-8');
  }
}

function readUser() {
  ensureFile();
  const fileBuffer = fs.readFileSync(DATA_FILE, 'utf-8');

  if (!fileBuffer) {
    return { ...DEFAULT_USER };
  }

  try {
    return JSON.parse(fileBuffer);
  } catch (error) {
    // fall back to default user if file gets corrupted
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_USER, null, 2), 'utf-8');
    return { ...DEFAULT_USER };
  }
}

function writeUser(payload) {
  ensureFile();
  const dataToPersist = JSON.stringify(payload, null, 2);
  fs.writeFileSync(DATA_FILE, dataToPersist, 'utf-8');
  return payload;
}

module.exports = {
  readUser,
  writeUser,
  ensureFile,
};

