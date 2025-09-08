const fs = require('fs');
const path = require('path');

const STOCK_FILE = path.join(__dirname, '../../data/stock.json');

if (!fs.existsSync(STOCK_FILE)) {
  fs.writeFileSync(STOCK_FILE, JSON.stringify({}), 'utf8');
}

function getStock() {
  return JSON.parse(fs.readFileSync(STOCK_FILE, 'utf8'));
}

function saveStock(stock) {
  fs.writeFileSync(STOCK_FILE, JSON.stringify(stock, null, 2), 'utf8');
}

function addToStock(type, accounts) {
  const stock = getStock();
  if (!stock[type]) {
    stock[type] = [];
  }
  stock[type] = stock[type].concat(accounts);
  saveStock(stock);
}

function getAccounts(type, count) {
  const stock = getStock();
  if (!stock[type] || stock[type].length < count) {
    return null;
  }
  return stock[type].slice(0, count);
}

function removeAccounts(type, accounts) {
  const stock = getStock();
  if (stock[type]) {
    stock[type] = stock[type].filter(account => !accounts.includes(account));
    saveStock(stock);
  }
}

module.exports = {
  getStock,
  addToStock,
  getAccounts,
  removeAccounts
};