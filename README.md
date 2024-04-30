# DMES - Digital Manufacturing Execution System

## Overview
DMES is a full-featured Digital Manufacturing Execution System designed to streamline the manufacturing process from inventory management to shipping. This system integrates various modules including inventory, orders, packing, and process steps management, all backed with blockchain technology for enhanced security and traceability.

## Key Features
- **Inventory Management:** Track and manage parts inventory.
- **Order Processing:** Create, update, and track orders through various stages.
- **Packing Module:** Manage packing operations for completed orders and generate shipping labels.
- **Process Steps Tracking:** Define and manage manufacturing process steps for parts.
- **Shipping Labels:** Generate QR code-based shipping labels for packed orders.
- **Blockchain Integration:** Store critical data on a blockchain for immutable record-keeping.

## Technologies Used
- **Node.js** for the backend server.
- **Express.js** for API routes.
- **MongoDB** for primary data storage.
- **Mongoose** ODM for MongoDB interaction.
- **React** for the frontend application.
- **Web3.js** for blockchain interactions.
- **Solidity** for smart contract implementation.
- **Ganache** for a personal blockchain for Ethereum development.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Ganache (or any Ethereum client)

### Setting Up a Local Development Environment
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dmes.git
   cd dmes
2. **Install dependencies**
   ```bash
   cd server
   npm install
   cd ../client
   npm install
3. **Set up environment variables**
   Create a .env file in the server directory and add the following:
   ```env
   MONGODB_URI=mongodb://localhost/dmes
   WEB3_PROVIDER=http://localhost:7545
4. **Start MongoDB**
   Ensure MongoDB is running on your system.
5. **Run Ganache**
   Start your local Ganache client to deploy contracts and perform transactions.
6. **Deploy Contracts**
   Navigate to the contracts directory and deploy your smart contracts using
   ```bash
   truffle migrate --reset
7. **Start the server**
   ```bash
   cd server
   npm start
8. **Run the React client**
   ```bash
   cd client
   npm start

## Usage
Navigate to http://localhost:3000 to access the DMES web application. Use the system to manage parts, orders, and process steps. Each module can be accessed via the dashboard and includes comprehensive management tools.

## API Endpoints
- **Orders: `/api/orders`** for managing orders.
- **Parts: `/api/parts`** for parts inventory management.
- **Process Steps: `/api/process-steps`** to manage manufacturing steps.
- **Containers: `/api/containers`** for container management in packing.
Each module supports standard REST operations (GET, POST, PUT, DELETE).

## Blockchain Interactions
- **PartRegistry.sol:** Manages parts on the blockchain.
- **OrderRegistry.sol:** Tracks order details and changes.
- **ProcessStepsRegistry.sol:** Manages process steps as blockchain entries.

## Future Enhancements
- Enhance blockchain integration for real-time tracking and verification.
- Implement advanced analytics for manufacturing efficiency.
- Expand the user interface for more intuitive navigation and management.
  
## License
This project is licensed under the MIT License.
