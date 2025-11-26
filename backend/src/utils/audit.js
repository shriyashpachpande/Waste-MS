const fs = require('fs');
const path = require('path');

// Append basic audit trail entries (e.g. user actions)
const auditFile = path.join(__dirname, '../../logs/audit.log');

function auditTrail({ userId, action, resource, outcome }) {
  const time = new Date().toISOString();
  const entry = `[${time}] userId=${userId} action=${action} resource=${resource} outcome=${outcome}\n`;
  fs.appendFile(auditFile, entry, err => {
    if (err) /* ignore for now */ null;
  });
}

module.exports = {
  auditTrail
};
