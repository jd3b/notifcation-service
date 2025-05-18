# Notification Service

## Description
This is a backend service for sending notifications to users via Email, SMS, and in-app channels. It uses Node.js, Express, Mongoose, Nodemailer, and Twilio.

## Features
* **API Endpoints:**
    * `POST /notifications`:  Sends a notification to a user.
    * `GET /users/:userId/notifications`: Retrieves notifications for a specific user.
* **Notification Types:** Email, SMS, and in-app.
* **Database:** MongoDB is used to store notification history.

## Setup Instructions

### Prerequisites
* Node.js (version >= 14)
* MongoDB
* A Gmail account (for sending emails)
* A Twilio account (for sending SMS)
* Postman or a similar API testing tool

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your_repository_url>
    cd notification-service
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    * Create a `.env` file in the project root.
    * Add the following environment variables, replacing the values with your actual credentials:
        ```
        PORT=3000
        MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database_name>
        EMAIL_USER=your-email@gmail.com
        EMAIL_PASS=your-email-password
        TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        TWILIO_AUTH_TOKEN=your-auth-token
        TWILIO_PHONE_NUMBER=+1234567890
        ```
    * **Important:** Ensure that your MongoDB server is running and accessible.  For Gmail, you might need to enable "Less secure app access" (not recommended for production) or use an App Password.  For production, it's highly recommended to use a proper email service like SendGrid, Mailgun, or AWS SES.

4.  **Start MongoDB:**
    * Make sure your MongoDB server is running.
    * If it is running on the default port, you don't need to specify the port in the `.env` file.

5.  **Start the application:**
    ```bash
    node index.js
    ```

### Running the application
The server will start at http://localhost:3000 (or the port specified in your `.env` file).

