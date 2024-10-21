import React, { useEffect, useState } from 'react';
import { getCurrentAccount, getTokenBalance } from '../services/blockchainService';

const TokenBalance = () => {
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            const currentAccount = await getCurrentAccount();
            setAccount(currentAccount);
            const balance = await getTokenBalance(currentAccount);
            setBalance(balance);
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Token Balance</h2>
            <p>Account: {account}</p>
            <p>Balance: {balance} PiCoin</p>
        </div>
    );
};

export default TokenBalance;
