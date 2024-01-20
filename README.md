
# Web-Based Restaurant Menu Project

## Overview
This project is a web-based restaurant menu application, designed to enhance the dining experience by offering an interactive and responsive digital menu. Developed using React.js and Tailwind CSS for the frontend, Express.js for the backend, and MongoDB for the database, it provides a seamless user experience for ordering food and beverages in a restaurant setting.

## Technologies
- **Frontend**: React.js, Tailwind CSS, Redux Toolkit
- **Backend**: Express.js
- **Database**: MongoDB
- **Additional Tools**: Node.js

## Features
- Dynamic listing of products with detailed descriptions.
- Interactive cart management for order customization.
- Real-time order processing using a RESTful API.
- Client-side state management with Redux Toolkit.
- Aesthetic and responsive user interface utilizing Tailwind CSS.

## Installation
1. Clone the repository
   ```
   git clone https://github.com/your-username/restaurant-menu-project.git
   ```
2. Install dependencies for both frontend and backend
   ```
   cd restaurant-menu-project/frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up your MongoDB database and update the connection string in the backend configuration.
4. Start the frontend and backend servers:
   ```
   // For frontend
   cd frontend
   cd cezar-bar
   npm i
   npm run dev

   // For backend
   cd backend
   npm i
   npm start
   ```

## Usage
Navigate to the frontend server URL (default: http://localhost:5173) to view the menu, manage your cart, and place orders. Backend API can be accessed for data management at http://localhost:3000.

## Contributing
Contributions to the project are welcome. Please fork the repository and submit a pull request for any enhancements, bug fixes, or features.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
