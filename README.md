# Wanderlust 🌍

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-v.20.14.0-green.svg)](https://nodejs.org/)

**Wanderlust** is a comprehensive full-stack travel marketplace platform, inspired by Airbnb. It allows users to discover unique stays worldwide, list their own properties, and engage with a community of travelers through reviews and ratings.

---

## 📖 Project Overview

Wanderlust solves the problem of finding and managing vacation rentals by providing a centralized hub for property owners and travelers. 

### Key Objectives:
- **For Travelers**: Browse diverse listings with high-quality images, read reviews, and find their next destination.
- **For Owners**: Easily list, edit, or delete their properties with a robust management interface.
- **For the Community**: A transparent review system to build trust between users.

Built with the **MEN stack** (MongoDB, Express.js, Node.js) and powered by **EJS** for dynamic templating, it offers a fast and responsive user experience.

---

## ✨ Features

- **🔐 Robust Authentication**: Secure user registration and login powered by `Passport.js`.
- **🏡 Listing Management**: Full CRUD operations for property listings (Create, Read, Update, Delete).
- **📸 Image Uploads**: Seamless image handling integrated with **Cloudinary** for cloud storage.
- **💬 Interactive Reviews**: A detailed feedback system allowing users to rate and comment on stays.
- **⚡ Dynamic UI**: Responsive design using **EJS-Mate** and Bootstrap for a premium look and feel.
- **📍 Map Integration**: (Roadmap feature) Visualization of property locations.
- **🔔 Flash Notifications**: Instant feedback on user actions (e.g., successful login, listing created).

---

## 🏗️ Project Architecture

The application follows the **Model-View-Controller (MVC)** architectural pattern to ensure a clean separation of concerns and maintainability.

1.  **Routes**: Capture incoming requests and delegate them to the appropriate controllers.
2.  **Controllers**: Contain the core business logic, interacting with models and rendering views.
3.  **Models**: Define the data schema for Listings, Reviews, and Users using Mongoose.
4.  **Views**: Render dynamic HTML content using EJS templates.

### Workflow:
`User Request` ➔ `Router` ➔ `Middleware (Auth/Validation)` ➔ `Controller` ➔ `Mongoose/MongoDB` ➔ `View (EJS)` ➔ `User Response`

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.

### Frontend
- **EJS**: Embedded JavaScript templates.
- **CSS3 / Bootstrap**: For styling and responsiveness.
- **JavaScript**: Client-side interactivity.

### Tools & Libraries
- **Passport.js**: Authentication middleware.
- **Cloudinary**: Cloud-based image management.
- **Multer**: Middleware for handling `multipart/form-data`.
- **Joi**: Schema description language and data validator.

---

## 🚀 Installation Guide

Prerequisites: Ensure you have **Node.js** and **MongoDB** installed on your machine.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Tilakakasapu/Wanderlust_project.git
    cd Wanderlust_project
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    CLOUD_NAME=your_cloud_name
    CLOUD_API_KEY=your_api_key
    CLOUD_API_SECRET=your_api_secret
    ATLAS_DB_URL=mongodb://127.0.0.1:27017/wanderlust
    ```

4.  **Initialize the Database**
    Seed the local database with sample data:
    ```bash
    node init/index.js
    ```

5.  **Run the Project**
    ```bash
    node app.js
    ```
    The application will be available at `http://localhost:8080`.

---

## 💻 Usage

- **Explore**: Navigate to the home page to view all available listings.
- **Host**: Click "Airbnb your home" to list your own property (requires login).
- **Details**: Click on a listing to see more images, description, and price.
- **Review**: Scroll to the bottom of a listing page to leave your feedback.

---

## 📂 Project Structure

```text
MajorProject/
├── controllers/      # Route logic for listings, reviews, and users
├── init/             # Database seeding scripts and data
├── models/           # Mongoose schemas (Listing, Review, User)
├── public/           # Static assets (CSS, JS, Images)
├── routes/           # Express routes
├── utils/            # Error handling and utility functions
├── views/            # EJS templates (Layouts, Includes, Pages)
├── app.js            # Main application entry point
├── package.json      # Project dependencies and scripts
└── .env              # Environment variables
```

---



## 🗺️ Roadmap & Future Improvements

- [ ] **Google Maps Integration**: Show property location on an interactive map.
- [ ] **Advanced Filtering**: Filter listings by price range, date availability, and more.
- [ ] **Real-time Chat**: Connect guests and hosts directly within the platform.
- [ ] **Payment Integration**: Implement a secure checkout using Stripe.

---
## ⚖️ License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

## 👤 Author

**Tilak Akasapu**
- GitHub: [@Tilakakasapu](https://github.com/Tilakakasapu)
- Project Link: [https://github.com/Tilakakasapu/Wanderlust_project](https://github.com/Tilakakasapu/Wanderlust_project)

---
*Developed with ❤️ for the Web Development Community.*

