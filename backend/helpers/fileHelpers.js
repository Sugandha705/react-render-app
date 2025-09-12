import { readFile, writeFile } from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

const dataFile = process.env.DATA_FILE || 'messages.json';

export async function readMessages() {
  const data = await readFile(dataFile, 'utf-8');
  return JSON.parse(data);
}

export async function writeMessages(messages) {
  await writeFile(dataFile, JSON.stringify(messages, null, 2));
}
