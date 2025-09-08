const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

const PRESTOCK_FILE = path.join(__dirname, '../../data/prestock_checks.json');

if (!fs.existsSync(PRESTOCK_FILE)) {
  fs.writeFileSync(PRESTOCK_FILE, JSON.stringify({}), 'utf8');
}

function setPreStockCheck(type, amount) {
  const data = JSON.parse(fs.readFileSync(PRESTOCK_FILE, 'utf8'));
  data[type] = {
    amount,
    timestamp: Date.now()
  };
  fs.writeFileSync(PRESTOCK_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getPreStockCheck(type) {
  const data = JSON.parse(fs.readFileSync(PRESTOCK_FILE, 'utf8'));
  return data[type];
}

function clearPreStockCheck(type) {
  const data = JSON.parse(fs.readFileSync(PRESTOCK_FILE, 'utf8'));
  delete data[type];
  fs.writeFileSync(PRESTOCK_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function createRestockEmbed(type, oldStock, newStock, addedAmount) {
  const typeInfo = {
    discord: {
      name: 'Discord Email + num vérified',
      price: '€0.55'
    },
    steam: {
      name: 'Steam Account',
      price: '€0.15'
    },
    minecraft: {
      name: 'Minecraft Premium',
      price: '€5.00'
    },
    rockstar: {
      name: 'Rockstar Account',
      price: '€0.35'
    },
    bundlef: {
      name: 'Bundle FiveM',
      price: '€0.90'
    },
    hazelifetime: {
      name: 'Haze Lifetime',
      price: '€20.00'
    },
    hazeweek: {
      name: 'Haze Week',
      price: '€10.00'
    }
  };

  const info = typeInfo[type] || { name: type, price: 'N/A' };

  return new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle(`**__Restock Update - ${info.name}__**`)
    .setDescription('||@here||')
    .addFields(
      { name: 'Ajout', value: `${addedAmount}x`, inline: true },
      { name: 'Total stock disponible', value: `${newStock}x`, inline: true },
      { name: 'Prix', value: info.price, inline: true },
      { name: 'Payment methods', value: '💳 PayPal', inline: false }
    )
    .setTimestamp();
}

module.exports = {
  setPreStockCheck,
  getPreStockCheck,
  clearPreStockCheck,
  createRestockEmbed
};