# DoubtShare-revly-io Assignment

## This document outlines the available routes, their functionalities, expected inputs, and responses for the application.

# Cron Job

## Count Available Tutors

- **Description**: Runs a cron job every second to count the available tutors based on their last ping time within a 3-second window from the current time.
- **Functionality**:
  - Queries the database to count tutors with lastPingTime within the specified window.
  - Logs the count of available tutors and the current time to the console.
- **Implementation**:
  - The cron job is initialized upon server startup using `cron.schedule('* * * * * *', countAvailableTutors)`.
  - `countAvailableTutors` function performs the database query and logging.


## User Routes

### Register User

- **Route**: `POST /user/register`
- **Description**: Registers a new user in the system.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
  - `name `: User's name.
  - `usertype `: The type of user registering (either a Student or a Tutor).
  - `userlanguage`: The languages spoken by the user..
  - `subjectexpertise`: The subjects in which the user has expertise (applicable for tutors)
  - `class`:he class or grade of the user (applicable for students)
- **Response**:
  - `200 OK` on successful registration.
  - `400 Bad Request` if the user already exists or missing required fields.
  - `500 Internal Server Error` for server issues.

### Login User

- **Route**: `POST /user/login`
- **Description**: Logs in a user and generates an authentication token.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
- **Response**:
  - `200 OK` on successful login with a generated authentication token.
  - `400 Bad Request` for incorrect passwords or missing required fields.
  - `404 Not Found` if the user is not registered.
  - `500 Internal Server Error` for server issues.

## Dought Routes

### Fetch Dought History

- **Route**: `GET /dought/history`
- **Description**: Retrieves the dought history for a specific user.
- **Request Body**:
  - `user`: User object containing `_id`.
- **Response**:
  - `200 OK` with dought history data sorted by creation date.
  - `404 Not Found` if the user's dought history is empty.
  - `500 Internal Server Error` for server issues.

## Tutor Routes

### Update Ping Time

- **Route**: `GET /tutor/update-ping`
- **Description**: Updates the last ping time for a tutor's availability.
- **Request Body**:
  - `user`: User object containing `_id` of the tutor.
- **Response**:
  - `200 OK` with a success message and updated data.
  - `404 Not Found` if the tutor's availability details are not found.
  - `500 Internal Server Error` for server issues.
