import Web3 from 'web3';
import { toast } from 'react-toastify';

// Initialize Web3
let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch((error) => {
        console.error("User  denied account access", error);
    });
} else {
    console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

// Function to get the current account
export const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
};

// Function to get the balance of an ERC20 token
export const getTokenBalance = async (tokenContract, account) => {
    try {
        const balance = await tokenContract.methods.balanceOf(account).call();
        return web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
    } catch (error) {
        console.error("Error fetching token balance:", error);
        toast.error("Failed to fetch token balance.");
        return 0;
    }
};

// Function to transfer tokens
export const transferTokens = async (tokenContract, to, amount, from) => {
    try {
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        await tokenContract.methods.transfer(to, amountInWei).send({ from });
        toast.success("Tokens transferred successfully!");
    } catch (error) {
        console.error("Error transferring tokens:", error);
        toast.error("Failed to transfer tokens.");
    }
};

// Function to interact with a smart contract method
export const callContractMethod = async (contract, methodName, ...args) => {
    try {
        const result = await contract.methods[methodName](...args).call();
        return result;
    } catch (error) {
        console.error(`Error calling contract method ${methodName}:`, error);
        toast.error(`Failed to call contract method: ${methodName}`);
        return null;
    }
};

// Function to send a transaction to a smart contract method
export const sendContractTransaction = async (contract, methodName, from, ...args) => {
    try {
        const result = await contract.methods[methodName](...args).send({ from });
        return result;
    } catch (error) {
        console.error(`Error sending transaction to ${methodName}:`, error);
        toast.error(`Failed to send transaction: ${methodName}`);
        return null;
    }
};

// Export the web3 instance for use in other files
export default web3;
