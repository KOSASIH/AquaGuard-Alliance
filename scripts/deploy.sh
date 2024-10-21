#!/bin/bash

# Check if the required environment variables are set
if [ -z "$NETWORK" ]; then
    echo "Error: NETWORK environment variable is not set."
    exit 1
fi

# Compile the smart contracts
echo "Compiling smart contracts..."
npx hardhat compile

# Deploy the smart contracts
echo "Deploying smart contracts to $NETWORK..."
npx hardhat run scripts/deploy.js --network $NETWORK

echo "Deployment completed successfully."
