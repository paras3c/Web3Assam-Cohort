import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '..', 'data.json');

// Default content if file doesn't exist
const DEFAULT_USER = {
  name: "John Doe",
  email: "john@example.com",
  role: "Developer"
};

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH);
    // File exists
  } catch (err) {
    // Create with default content
    await fs.writeFile(DATA_PATH, JSON.stringify(DEFAULT_USER, null, 2), 'utf-8');
  }
}

export async function readDataFile() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function writeDataFile(data) {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
