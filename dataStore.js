// dataStore.js
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const DATA_FILE = path.join(app.getPath('userData'), 'machines.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readData() {
  ensureDataFile();
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function generateId() {
  return Date.now().toString();
}

async function addMachine(machine) {
  const data = readData();
  const newMachine = {
    id: generateId(),
    name: machine.name,
    tags: machine.tags,
    ip: machine.ip,
    hostname: machine.hostname,
    username: machine.username,
    key: machine.key,
    favorite: false
  };
  data.push(newMachine);
  writeData(data);
  return newMachine;
}

async function getMachines(query) {
  const data = readData();
  if (!query || query.trim() === '') return data;

  query = query.toLowerCase();
  return data.filter((m) =>
    m.name.toLowerCase().includes(query) ||
    m.ip.toLowerCase().includes(query) ||
    m.hostname.toLowerCase().includes(query) ||
    m.username.toLowerCase().includes(query) ||
    m.key.toLowerCase().includes(query) ||
    (m.tags && m.tags.join(' ').toLowerCase().includes(query))
  );
}

async function toggleFavorite(id) {
  const data = readData();
  const machine = data.find(m => m.id === id);
  if (!machine) throw new Error('Machine not found');
  machine.favorite = !machine.favorite;
  writeData(data);
  return machine;
}

async function deleteMachine(id) {
  let data = readData();
  const initialLength = data.length;
  data = data.filter(m => m.id !== id);
  if (data.length === initialLength) {
    throw new Error('Machine not found');
  }
  writeData(data);
}

module.exports = {
  addMachine,
  getMachines,
  toggleFavorite,
  deleteMachine
};
