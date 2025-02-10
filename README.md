# Twilio API Integration

This is a Node.js application that integrates with the Twilio API to send SMS messages and make phone calls. The application is built using the Express framework and uses the `twilio` package to interact with Twilio's services.

## Features

- **Send SMS Messages**: Send text messages to a specified phone number using Twilio's messaging service.
- **Make Phone Calls**: Initiate phone calls to a specified phone number using Twilio's voice service.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine.
- A Twilio account with an Account SID, Auth Token, and a Twilio phone number.
- Environment variables set up for sensitive information (e.g., Twilio credentials).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Muhammad-Adam1/node-twilio.git
   cd node-twilio
2. **Install dependencies**:
   ```bash
   npm install
3. **Run file**:
   ```bash
   npm index.js
4. **Send SMS Message**:
   
   **Endpoint**:
   
   method: post
   
   `http://localhost:8000/send-message`
   
    **Request Body**:
   ```json
    {
      "to_number": "+1234567890",
      "message_body": "Hello, this is a test message!",
      "account_sid": "your_account_sid",
      "auth_token": "your_auth_token"
    }
6. **Make a Phone Call**:
   
   **Endpoint**:
   
   method: post

   `http://localhost:8000/make-call`
   
   **Request Body**:
   ```json
    {
    "to_number": "+1234567890",
    "account_sid" : null,
    "auth_token" : null
    }
