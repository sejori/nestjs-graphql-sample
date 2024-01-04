const fs = require('fs');
const path = require('path');

module.exports.createUser = fs.readFileSync(path.join(__dirname, 'createUser.gql'), 'utf8');
module.exports.updateUser = fs.readFileSync(path.join(__dirname, 'updateUser.gql'), 'utf8');
module.exports.deleteUser = fs.readFileSync(path.join(__dirname, 'deleteUser.gql'), 'utf8');
