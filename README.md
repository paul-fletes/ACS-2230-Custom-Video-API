# ACS-2230-Custom-Video-API

This is a simple API for managing a video store. It allows users to browse available videos, purchase them, and manage their own purchases. The API was built using Node.js and MongoDB.

### Getting Started

To get started with the project, you'll need to have Node.js and MongoDB installed on your system.

1. Clone the repository to your local machine.
* ```git clone https://github.com/paul-fletes/ACS-2230-Custom-Video-API.git```

2. Install the required dependencies by running npm install.
* ```npm install```

3. Create a .env file at the root of the project, with the following variables:
* ```cp .env ```

```bash
PORT=3000
MONGODB_URI=mongodb://localhost/ACS-2230-Custom-Video-API
JWT_SECRET=your_secret_key_here
```

4. Run the application using the command `nodemon`.
5. You should now be able to access the API at `http://localhost:3000`.

### Endpoints

The following endpoints are available in the API:

* `GET /videos`: Returns a list of all available videos.
* `POST /video`s`: Creates a new video.
* `GET /videos/:id`: Returns a single video.
* `PUT /videos/:id`: Updates a video.
* `DELETE /videos/:id`: Deletes a video.
* `POST /auth/signup`: Creates a new user account.
* `POST /auth/login`: Logs in a user and returns an access token.
* `GET /purchases`: Returns a list of all purchases made by the authenticated user.
* `POST /purchases`: Creates a new purchase.

### Authentication
Some of the API endpoints are protected, which means they can only be accessed by users who are authenticated (i.e. have logged in). To see that you're an authenticated user, you need to include an `Authorization` header in your request. This header should contain a valid JWT token, which you can get by logging in using the `/auth/login` endpoint. Once you have a valid token, you can include it in your requests to protected endpoints to access the corresponding functionality.

### Testing
The API includes a suite of tests that can be run using the command `npm test`. The tests use the Mocha testing framework and the Chai assertion library.
