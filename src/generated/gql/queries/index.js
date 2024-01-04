const fs = require('fs');
const path = require('path');

module.exports.getUser = fs.readFileSync(path.join(__dirname, 'getUser.gql'), 'utf8');
module.exports.listUsers = fs.readFileSync(path.join(__dirname, 'listUsers.gql'), 'utf8');
module.exports.getGravatar = fs.readFileSync(path.join(__dirname, 'getGravatar.gql'), 'utf8');
