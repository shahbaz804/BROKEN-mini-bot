const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'antidel.json');

// Create file if it doesn’t exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ antiDelete: false }, null, 2));
}

// Get anti-delete status
function getAnti() {
  const data = JSON.parse(fs.readFileSync(filePath));
  return data.antiDelete || false;
}

// Set anti-delete status
function setAnti(value) {
  const data = { antiDelete: !!value };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { getAnti, setAnti };