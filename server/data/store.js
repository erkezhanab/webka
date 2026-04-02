const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname);
const dbFile = path.join(dataDir, 'db.json');

const initialState = {
  users: [],
  articles: [],
};

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dbFile);
  } catch {
    await fs.writeFile(dbFile, JSON.stringify(initialState, null, 2), 'utf8');
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbFile, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(data) {
  await ensureDb();
  await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

function createId() {
  return crypto.randomUUID();
}

async function getUsers() {
  const db = await readDb();
  return db.users;
}

async function saveUsers(users) {
  const db = await readDb();
  db.users = users;
  await writeDb(db);
}

async function getArticles() {
  const db = await readDb();
  return db.articles;
}

async function saveArticles(articles) {
  const db = await readDb();
  db.articles = articles;
  await writeDb(db);
}

async function resetDb(nextState = initialState) {
  await writeDb(nextState);
}

module.exports = {
  createId,
  ensureDb,
  getUsers,
  saveUsers,
  getArticles,
  saveArticles,
  resetDb,
};
