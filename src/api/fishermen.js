const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const FishermenWelfare = require('../blockchain/contracts/FishermenWelfare.json');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));
const fishermenWelfareContract = new web3.eth.Contract(FishermenWelfare.abi, '0x...FishermenWelfareContractAddress...');

router.get('/available-catches', async (req, res) => {
    try {
        const catches = await fishermenWelfareContract.methods.getCatches().call();
        res.json(catches);
    } catch (error) {
        console.error('Error fetching catches:', error);
        res.status(500).json({ message: 'Failed to fetch catches' });
    }
});

module.exports = router;
