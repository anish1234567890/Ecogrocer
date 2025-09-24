# Ecogrocer 🛍️

Ecogrocer is a full-stack e-commerce web application designed to connect users with fresh, organic produce directly from local farms. It provides a seamless shopping experience, from browsing products to secure online payments, and includes a dedicated dashboard for administrators to manage orders.

## ✨ Features

### User Features
* **Browse Farms and Products:** Users can view different farms and the products they offer.
* **Product Search:** A search bar allows users to find specific products across all farms.
* **Shopping Cart:** Users can add products to a cart, adjust quantities, and remove items.
* **User Authentication:** Secure user registration and login functionality.
* **Checkout Process:** A multi-step checkout process including address entry and secure payment via Stripe.
* **Order History:** Authenticated users can view their past orders and check their status.

### Admin Features
* **Admin Dashboard:** A dashboard to view and manage all customer orders.
* **Order Management:** Admins can view detailed information for each order and update its status (e.g., Placed, Confirmed, Shipped, Delivered).

---

## 🛠️ Technologies Used

### Frontend
* **React**: A JavaScript library for building user interfaces.
* **React Router**: For client-side routing and navigation.
* **Axios**: For making HTTP requests to the backend API.
* **Stripe.js**: To securely handle payments in the browser.
* **Framer Motion**: For animations and transitions.
* **Vite**: A modern build tool for frontend development.

### Backend
* **Node.js**: A JavaScript runtime for the server-side.
* **Express**: A web application framework for Node.js.
* **MongoDB**: A NoSQL database for storing application data.
* **Mongoose**: An ODM library for MongoDB to model application data.
* **JSON Web Tokens (JWT)**: For implementing user authentication and authorization.
* **Stripe API**: For processing payments on the server.
* **Bcrypt**: For hashing user passwords before storing them.
* **CORS**: To enable Cross-Origin Resource Sharing between the frontend and backend.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm (or yarn) installed on your machine.
* A MongoDB database (local or cloud-based).
* A Stripe account for payment processing.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd ecogrocer
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```sh
        cd backend
        ```
    * Install the dependencies:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add the following environment variables:
        ```
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        STRIPE_SECRET_KEY=<your_stripe_secret_key>
        ```
    * Start the backend server:
        ```sh
        npm run dev
        ```
    The server will be running on `http://localhost:5000`.

3.  **Frontend Setup:**
    * Open a new terminal and navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    * Install the dependencies:
        ```sh
        npm install
        ```
    * Start the frontend development server:
        ```sh
        npm run dev
        ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

---

## 📂 Folder Structure

The project is organized into two main directories:

* `frontend/`: Contains the React application.
    * `src/`: Main source code.
        * `components/`: Reusable React components (e.g., `NavBar`, `ProductCard`).
        * `Pages/`: Top-level page components corresponding to different routes.
        * `App.jsx`: Main application component where routing is defined.
        * `main.jsx`: The entry point of the React application.
* `backend/`: Contains the Node.js/Express server.
    * `config/`: Configuration files (e.g., database connection, authentication).
    * `controllers/`: Logic for handling requests and sending responses.
    * `models/`: Mongoose schemas for the database collections.
    * `routes/`: API route definitions.
    * `server.js`: The main entry point for the backend server.