const fs = require('fs');
const path = require('path');

const STEAM_FILE = path.join(__dirname, '../../data/steam_accounts.json');
const ROCKSTAR_FILE = path.join(__dirname, '../../data/rockstar_accounts.json');
const MINECRAFT_FILE = path.join(__dirname, '../../data/minecraft_accounts.json');
const DISCORD_FILE = path.join(__dirname, '../../data/discord_accounts.json');
const BUNDLEF_FILE = path.join(__dirname, '../../data/bundlef_accounts.json');
const HAZELIFETIME_FILE = path.join(__dirname, '../../data/hazelifetime.json');
const HAZEWEEK_FILE = path.join(__dirname, '../../data/hazeweek.json');

[STEAM_FILE, ROCKSTAR_FILE, MINECRAFT_FILE, DISCORD_FILE, BUNDLEF_FILE, HAZELIFETIME_FILE, HAZEWEEK_FILE].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ accounts: [] }), 'utf8');
  }
});

function getAccounts(type) {
  const files = {
    'steam': STEAM_FILE,
    'rockstar': ROCKSTAR_FILE,
    'minecraft': MINECRAFT_FILE,
    'discord': DISCORD_FILE,
    'bundlef': BUNDLEF_FILE,
    'hazelifetime': HAZELIFETIME_FILE,
    'hazeweek': HAZEWEEK_FILE
  };
  const file = files[type];
  if (!file) throw new Error('Type de compte invalide');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return data.accounts;
}

function checkForDuplicates(type, newAccounts) {
  const existingAccounts = getAccounts(type);
  const duplicates = newAccounts.filter(account => 
    existingAccounts.includes(account)
  );
  return duplicates;
}

function addAccounts(type, newAccounts, config) {
  const files = {
    'steam': STEAM_FILE,
    'rockstar': ROCKSTAR_FILE,
    'minecraft': MINECRAFT_FILE,
    'discord': DISCORD_FILE,
    'bundlef': BUNDLEF_FILE,
    'hazelifetime': HAZELIFETIME_FILE,
    'hazeweek': HAZEWEEK_FILE
  };
  const file = files[type];
  if (!file) throw new Error('Type de compte invalide');

  if (config.preventDuplicates) {
    const duplicates = checkForDuplicates(type, newAccounts);
    if (duplicates.length > 0) {
      throw {
        code: 'DUPLICATE_ACCOUNTS',
        duplicates: duplicates
      };
    }
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.accounts = [...data.accounts, ...newAccounts];
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function removeAccounts(type, count) {
  const files = {
    'steam': STEAM_FILE,
    'rockstar': ROCKSTAR_FILE,
    'minecraft': MINECRAFT_FILE,
    'discord': DISCORD_FILE,
    'bundlef': BUNDLEF_FILE,
    'hazelifetime': HAZELIFETIME_FILE,
    'hazeweek': HAZEWEEK_FILE
  };
  const file = files[type];
  if (!file) throw new Error('Type de compte invalide');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const removedAccounts = data.accounts.splice(0, count);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  return removedAccounts;
}

function getStockCounts() {
  return {
    steam: getAccounts('steam').length,
    rockstar: getAccounts('rockstar').length,
    minecraft: getAccounts('minecraft').length,
    discord: getAccounts('discord').length,
    bundlef: getAccounts('bundlef').length,
    hazelifetime: getAccounts('hazelifetime').length,
    hazeweek: getAccounts('hazeweek').length,
  };
}

module.exports = {
  getAccounts,
  addAccounts,
  removeAccounts,
  getStockCounts,
  checkForDuplicates
};