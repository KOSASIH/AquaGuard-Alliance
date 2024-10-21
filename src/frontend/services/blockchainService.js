const Web3 = require('web3');

const blockchainService = {
    async getCurrentAccount() {
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            return accounts[0];
        } catch (error) {
            console.error("Error getting current account:", error);
            return '';
        }
    },

    async getTokenBalance(account) {
        try {
            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(account);
            return web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error("Error getting token balance:", error);
            return 0;
        }
    },
};

export default blockchainService;
