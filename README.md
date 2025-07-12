# Stickers API Project

This document outlines the steps taken to create the stickers-api project.

## Step 1: Project Initialization

- Install Node.js and Git.
- Initialize the project with `npm init -y` inside the `stickers-api` folder to create `package.json`.
- Add a `start` script to `package.json` to run the application with `node index.js`.
- Create a new GitHub repository and initialize the local project with `git init`.
- Create a `.gitignore` file to prevent the `node_modules` folder from being pushed to the repository.
- Create a basic HTTP server using the native `http` module from Node.js.
- Install Express with `npm install express` to simplify route and middleware implementation.

## Step 2: API Endpoints

- **GET /login**: 
    - This is the first of three endpoints.
    - It receives `email` and `password` in the request body.
    - Express's body parser is used to validate the entries.
    - The password is encrypted using Node.js's `crypto` module.
    - Returns a `{ publicId }` to be used as an authentication token.
- **Fake User Data**:
    - A mock user object is created for initial testing:
        - `id`: 1
        - `email`: `test@example.com`
        - `password`: (encrypted '123456')
        - `publicId`: (generated with `crypto.randomUUID()`)
- **Private Endpoints (TODO)**:
    - **GET /stickers**: 
        - Requires authentication via `publicId` as a query parameter.
        - Retrieves all stickers for the authenticated user.
    - **POST /stickers**:
        - Requires authentication via `publicId` as a query parameter.
        - Opens a new sticker pack (containing 5 stickers).
        - Limited to 10 stickers (2 packs) per day.

## Step 3: Database Integration

- Install `sqlite3` with `npm install sqlite3`.
- Create a local database file named `db.sqlite`.
- Create a script to initialize the database, creating a `users` table and adding the first user if they don't already exist.
- Implement the login functionality to query the database for the user instead of using the fake user object.

## Step 4: ORM Integration

- Install Sequelize with `npm i sequelize`.
- Create `config/database.js` for database configuration.
- Create `models/user.js` to define the User model.
- Create `models/stickers.js` to define the Sticker model.
- Refactor the database logic to use the Sequelize ORM instead of raw SQL queries.

## Step 5: Final Endpoints Implementation

- **GET /stickers**:
    - Implement the logic to retrieve all stickers belonging to a user by matching the `publicId` field in the Sticker model.
- **POST /stickers**:
    - Retrieve 5 stickers from the database where `publicId` is `null`.
    - Update these 5 stickers, setting their `publicId` to the user's ID and `openedAt` to the current timestamp (as an ISO string).
    - If fewer than 5 stickers are available, trigger a function to create 200 new stickers.
    - Before inserting the new stickers, sort the array and perform a batch insert for efficiency.

## Step 6: API Documentation

- Install `swagger-ui-express` and `swagger-jsdoc` to generate API documentation.
