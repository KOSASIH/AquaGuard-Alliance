#!/bin/bash

# Update package list and install Node.js and npm
echo "Setting up the development environment..."

# Check for Node.js installation
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Install global dependencies if needed
echo "Installing global dependencies..."
npm install -g truffle hardhat

echo "Development environment setup completed."
