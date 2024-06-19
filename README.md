
# NFT Auction Platform

## Overview
This project is an NFT (Non-Fungible Token) auction platform built using React for the frontend, Node.js for the server-side logic, Spring Boot for backend services, and Solidity for smart contracts. The platform leverages blockchain technology to facilitate secure and transparent auctions of digital assets.

## Architecture
- **Frontend**: React
- **Server-side Logic**: Node.js
- **Backend Services**: Spring Boot
- **Blockchain**: Utilizes Ethereum blockchain and Solidity for smart contracts.
- **File Storage**: IPFS with Pinata for decentralized storage of digital assets.

## Technologies Used
- **Solidity**: For writing smart contracts.
- **JavaScript**: For developing the frontend (React).
- **Hardhat**: Ethereum development environment.
- **IPFS (Pinata)**: For decentralized file storage.
- **Web3.js**: For interacting with the Ethereum blockchain from the frontend.
- **Express.js**: For building the Node.js server.
- **MongoDB**: For storing user data and auction information.

## Features
- **User Authentication**: Secure user login and registration.
- **NFT Creation**: Allows users to mint their own NFTs.
- **Auction Management**: Create, manage, and participate in auctions.
- **Real-time Bidding**: Live updates of bids in real-time.
- **Transaction Handling**: Secure and transparent transaction management using blockchain.
- **User Dashboard**: Personalized dashboard for managing NFTs and auctions.

## Prerequisites
- Node.js and npm
- Java 11 or higher
- MongoDB
- Metamask (or any Ethereum wallet)
- Docker
- Hardhat

## Setup Instructions

### Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/safalifter/live-auction-spring-react.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Build and run the Spring Boot application:
   ```sh
   ./mvnw spring-boot:run
   ```

### Server-side Logic (Node.js)
1. Navigate to the server directory:
   ```sh
   cd server
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the Node.js server:
   ```sh
   npm start
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Run the React application:
   ```sh
   npm run start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

### Blockchain Configuration
1. Install Hardhat:
   ```sh
   npm install --save-dev hardhat
   ```
2. Start the Hardhat node to get 20 accounts with 10k fake ETH each:
   ```sh
   npx hardhat node
   ```
3. Install Metamask extension and connect it to the local network:
   - Network Name: Local Host
   - New RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
4. Deploy smart contracts:
   ```sh
   npx hardhat run src/backend/scripts/deploy.js --network localhost
   ```

### Running with Docker
1. Raise containers:
   ```sh
   docker-compose up
   ```

## Accessing the Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

```
A blockchain-based NFT auction platform using Solidity, React, Node.js, and Spring Boot. Features secure user authentication, real-time bidding, and decentralized file storage with IPFS (Pinata).
```
