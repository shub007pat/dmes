const { Web3 } = require('web3');

// Assuming Ganache is running on this endpoint
const ganacheUrl = 'http://127.0.0.1:7545';
const web3 = new Web3(ganacheUrl);

module.exports = web3;
