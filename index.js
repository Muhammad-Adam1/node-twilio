require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// // Initialize Twilio client
// const twilioClient = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );

// Send Message Endpoint
app.post('/send-message', async (req, res) => {
    try {
        const { to_number, message_body, account_sid, auth_token } = req.body;

        const credentials = {
            accountSid: account_sid || process.env.TWILIO_ACCOUNT_SID,
            authToken: auth_token || process.env.TWILIO_AUTH_TOKEN
        };

        const twilioClient = twilio(credentials.accountSid, credentials.authToken);

        const message = await twilioClient.messages.create({
            body: message_body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to_number
        });

        const response = {
            account_sid: message.accountSid,
            api_version: message.apiVersion,
            body: message.body,
            date_created: message.dateCreated,
            date_sent: message.dateSent,
            date_updated: message.dateUpdated,
            direction: message.direction,
            error_code: message.errorCode,
            error_message: message.errorMessage,
            from: message.from,
            num_media: message.numMedia,
            num_segments: message.numSegments,
            messaging_service_sid: message.messagingServiceSid,
            sid: message.sid,
            status: message.status,
            to: message.to,
            uri: message.uri,
            subresource_uris: {
                media: message.subresourceUris.media
            },
            tags: {
                campaign_name: "Spring Sale 2022",
                message_type: "cart_abandoned"
            }
        };

        res.json(response);

    } catch (error) {
        console.error('Twilio message error:', error);
        res.status(400).json({
            success: false,
            error: error.message,
            details: error.details || 'An unexpected error occurred while sending the message.'
        });
    }
});


// Make Call Endpoint
app.post('/make-call', async (req, res) => {
    try {
        const { to_number, account_sid, auth_token } = req.body;
        
        const credentials = {
            accountSid: account_sid || process.env.TWILIO_ACCOUNT_SID,
            authToken: auth_token || process.env.TWILIO_AUTH_TOKEN
        };
        
        const twilioClient = twilio(credentials.accountSid, credentials.authToken);
        
        const call = await twilioClient.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: to_number,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        const response = {
            account_sid: call.accountSid,
            api_version: call.apiVersion,
            sid: call.sid,
            status: call.status,
            from: call.from,
            to: call.to,
            start_time: call.startTime,
            end_time: call.endTime,
            duration: call.duration,
            direction: call.direction,
            caller_id: call.callerId,
            uri: call.uri,
            subresource_uris: {
                messages: call.subresourceUris.messages,
                recordings: call.subresourceUris.recordings
            }
        };

        res.json(response);

    } catch (error) {
        console.error('Twilio call error:', error);
        res.status(400).json({
            success: false,
            error: error.message,
            details: error.details || 'An unexpected error occurred while making the call.'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});