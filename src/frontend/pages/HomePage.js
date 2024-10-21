import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Welcome to AquaGuard Alliance</h2>
                <p>Your platform for sustainable fishing and community engagement.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
