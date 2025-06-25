import path from "path";
import { fileURLToPath } from "url";
import pkg from "@google-cloud/translate";
const { v2 } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the key file path from environment variable
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// ✅ Ensure this file path exists
const translate = new v2.Translate({
  keyFilename: keyPath,
});

export const translateToEnglish = async (text) => {
  try {
    const [translation] = await translate.translate(text, "en");
    return translation;
  } catch (err) {
    console.error("Translation error:", err.message);
    return text;
  }
};
