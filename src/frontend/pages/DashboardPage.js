import React from 'react';
import Header from '../components/Header';
import TokenBalance from '../components/TokenBalance';
import Footer from '../components/Footer';

const DashboardPage = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Dashboard</h2>
                <TokenBalance />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
