// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
// const twilio = require('twilio');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// // Function to send SMS
// function sendSms(to, body) {
//   return client.messages.create({
//     body: body,
//     from: process.env.PHONE_NUMBER,
//     to: to
//   });
// }


// app.get('/', (req, res) => {
//   res.send('SMS Onboarding Server is running!');
// });


// // Simple in-memory store for onboarding state (for demo only)
// const onboardingStates = {};

// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();
//   const incomingMsg = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
//   const fromNumber = req.body.From;

//   console.log(`Received message from ${fromNumber}: ${incomingMsg}`);

//   // Initialize state if not present
//   if (!onboardingStates[fromNumber]) {
//     onboardingStates[fromNumber] = { step: 0, data: {} };
//   }

//   const state = onboardingStates[fromNumber];

//   // Onboarding flow logic
//   if (incomingMsg === 'join' && state.step === 0) {
//     twiml.message('Welcome to W-Setu! Please reply with your shop name.');
//     state.step = 1;
//   } else if (state.step === 1) {
//     state.data.shopName = req.body.Body.trim();
//     twiml.message('Thanks! Now reply with your shop location (city/village).');
//     state.step = 2;
//   } else if (state.step === 2) {
//     state.data.location = req.body.Body.trim();
//     twiml.message('Great! Which language do you prefer? (Hindi, Tamil, English, etc.)');
//     state.step = 3;
//   } else if (state.step === 3) {
//     state.data.language = req.body.Body.trim();
//     twiml.message('Thank you! Your registration is complete. We will contact you soon.');
//     state.step = 4;
//     // Here you can save state.data to a database
//     console.log(`Onboarding data for ${fromNumber}:`, state.data);
//   } else if (incomingMsg === 'help') {
//     twiml.message('To start onboarding, reply JOIN. For support, contact support@wsetu.com');
//   } else {
//     twiml.message('Sorry, I did not understand that. Reply JOIN to start onboarding or HELP for assistance.');
//   }

//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// });

// const port = process.env.PORT || 4040;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });





require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

client.messages
  .create({
    body: 'Hello from Twilio! This is a test message to your Indian mobile number.',
    from: process.env.PHONE_NUMBER, // Your Twilio number (e.g., +17754158456)
    to: '+919718205298' // Replace with your Indian mobile number in E.164 format
  })
  .then(message => console.log('Message sent with SID:', message.sid))
  .catch(error => console.error('Error sending SMS:', error));
