# Notes-App

This app is part of my personal portfolio and serves as a showcase for what I have learned over the last 3 months. It's also an open space for feedback and code reviews.
The Notes-App demonstrates my abilities in building simple, responsive web applications.

## Features

- The Notes-App, as the name suggests, is a note-taking app built with **React**. It interacts with a simple **Express.js** backend that allows users to create, edit, and delete notes stored in an **SQLite** database. The notes can include text, images, and a customized color, similar to sticky notes.

## Technologies Used

This app is built with the following technologies:

### Front-End
- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: State management for efficient data handling and application state control.
- **React Router**: Enables client-side routing for seamless navigation between pages.

### Back-End
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js, used for creating APIs and routing.
- **SQLite**: A lightweight SQL database for storing and managing app data (e.g., user messages).


## Installation

To run this app locally:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/Shadow-Child/Note-App.git

2. Install front-end dependencies and run:
   ```bash
   npm install
   npm run dev

3. Navigate to back-end folder:
   ```bash
   cd back-end
   
4. Install back-end dependencies and run:
   ```bash
   npm install
   node api/app.js
