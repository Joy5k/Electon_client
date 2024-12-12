# Electrical Product Website Frontend

This document serves as the README file for the frontend part of the Electrical Product Website. This project aims to create an interactive platform for browsing and purchasing electrical products like PCs, laptops, cameras, and accessories. It provides a modern and user-friendly interface, ensuring a smooth shopping experience for users.

# Live Link

The live version of the project can be accessed here: [Electrical Product Website](https://electon-one.vercel.app/)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Contributions](#contributions)
8. [License](#license)

---

## Introduction

The **Electrical Product Website Frontend** is built to provide:

- A comprehensive platform to browse and purchase electrical products.
- A seamless user experience with advanced search and filtering options.
- Admin tools for managing products and user interactions.

This README focuses solely on the frontend implementation.

## Features

### User Features

- **Login & Registration**: Users can securely sign up or log in to their accounts.
- **Browse Products**: Users can view and search through a variety of electrical products.
- **Add to Cart**: Users can add products to their cart and proceed to checkout.
- **Profile Management**: Users can manage their profiles, view their purchase history, and update their details.

### Admin Features

- **Manage Products**: Admins can add, edit, or remove products.
- **Order Management**: Admins can view and manage customer orders.
- **Analytics Dashboard**: Admins can view insights and sales data in real-time.

## Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **Forms & Validation**: Formik and Yup
- **Icons & UI Components**: Material UI and React Icons

## Setup and Installation

### Prerequisites

Before running this project, ensure you have:

1. **Node.js** installed (v14 or above).
2. **npm** or **yarn** installed.
3. A modern web browser.

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/electrical-product-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd electrical-product-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

## Project Structure

```plaintext
src/
|-- assets/             # Images and static assets
|-- components/         # Reusable UI components
|-- config/             # Manage all configurations
|-- constants/          # Manage all constants
|-- hooks/              # Custom hooks
|-- pages/              # Page-level components
|-- redux/              # Redux store and slices
|-- routes/             # Handle React Routing
|-- types/              # Manage all TypeScript types
|-- utils/              # Utility functions and helpers
|-- App.tsx             # Main app component
|-- index.tsx           # Entry point of the application
```

## Usage

### Development

- Run `npm start` to launch the development server.
- Make changes in the codebase; the app will hot-reload automatically.

### Production

- Build the app using:
  ```bash
  npm run build
  ```
- Deploy the build folder to your hosting provider.

## Contributions

Contributions are welcome! If you’d like to contribute to this project:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```
4. Create a Pull Request.


