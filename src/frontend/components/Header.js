import React from 'react';
import './components.scss';

const Header = () => {
    return (
        <header className="app-header">
            <h1>AquaGuard Alliance</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/events">Community Events</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
