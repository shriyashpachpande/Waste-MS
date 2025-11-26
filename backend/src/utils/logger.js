const fs = require('fs');
const path = require('path');

// Simple logger that writes to console and file
const logFile = path.join(__dirname, '../../logs/app.log');

function log(message, level = 'INFO') {
  const time = new Date().toISOString();
  const entry = `[${time}] [${level}] ${message}`;
  console.log(entry);
  fs.appendFile(logFile, entry + '\n', err => {
    if (err) /* ignore file error */ null;
  });
}

module.exports = {
  log,
  error: (msg) => log(msg, 'ERROR'),
  warn: (msg) => log(msg, 'WARN'),
  info: (msg) => log(msg, 'INFO'),
};
