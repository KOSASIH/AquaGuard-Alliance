# AquaGuard Alliance API Reference

## Overview

The AquaGuard Alliance API provides endpoints for interacting with the backend services. It allows developers to access data, manage users, and interact with the blockchain.

## Base URL

```bash
1. http://localhost:5000/api
```


## Authentication

All API requests require authentication. Use the following method to obtain a token:

### Login

- **Endpoint**: `/auth/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password ": "password"
  }
  ```

  - Response
  
```json
1.  {
2. "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
3. }
```

# Endpoints

## Coral Reef Health

- **Get Coral Health Data**: /coral-health

- Method: GET
- Response:

```json
1. {
2.  "temperature": 25.5,
3.  "pH": 8.2,
4.  "salinity": 35.5
5. }
```

## Fishermen Welfare Program

- **List Available Catch**: /fishermen/available-catch

- Method: GET
- Response:

```json
1. [
2.  {
3.    "species": "Tuna",
4.    "quantity": 50,
5.    "price": 10.99
6.  },
7.  {
8.    "species": "Salmon",
9.    "quantity": 20,
10.    "price": 12.99
11.  }
12. ]
```

- **Create New Listing**: /fishermen/new-listing

- Method: POST
- Request Body:

```json
1. {
2.  "species": "Tuna",
3.  "quantity": 50,
4.  "price": 10.99
5. }
```

## Blockchain Interactions

- **Get User Balance**: /blockchain/balance

- Method: GET
- Response:

```json
1. {
2.  "balance": 100.0
3. }
```

- **Transfer Pi Coin**: /blockchain/transfer

- Method: POST
- Request Body:

```json
1. {
2.  "recipient": "0x1234567890abcdef",
3.  "amount": 10.0
4. }
```

This API reference provides a comprehensive overview of the available endpoints and their usage. For more information or assistance, please contact our development team.
