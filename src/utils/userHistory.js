const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, '../../data/user_history.json');

if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify({ users: {} }), 'utf8');
}

function addProductToHistory(userId, productType, quantity) {
  const data = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  
  if (!data.users[userId]) {
    data.users[userId] = [];
  }
  
  data.users[userId].push({
    type: productType,
    quantity: quantity,
    date: new Date().toISOString()
  });
  
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getUserHistory(userId) {
  const data = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  return data.users[userId] || [];
}

module.exports = {
  addProductToHistory,
  getUserHistory
};