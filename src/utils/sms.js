import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.PHONE_NUMBER;
const isProduction = process.env.NODE_ENV === "production";

const client = twilio(accountSid, authToken);

export async function sendSMS(to, message) {
  if (!isProduction) {
    console.log(`[DEV] SMS to ${to}: ${message}`);
    return;
  }
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioNumber,
      to,
    });
    console.log(`SMS sent to ${to}: ${response.sid}`);
    return response;
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.message);
    throw error;
  }
}
