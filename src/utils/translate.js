import path from "path";
import { fileURLToPath } from "url";
import pkg from "@google-cloud/translate";
import fs from "fs"; // for debug

const { v2 } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the key file path from environment variable
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// ✅ Debug: Print path and check if file exists
console.log("🔍 GOOGLE_APPLICATION_CREDENTIALS:", keyPath);
console.log("📂 Credentials file exists:", fs.existsSync(keyPath));

// ✅ Initialize translate client
const translate = new v2.Translate({
  keyFilename: keyPath,
});

export const translateToEnglish = async (text) => {
  try {
    const [translation] = await translate.translate(text, "en");
    console.log(`✅ Translated "${text}" → "${translation}"`);
    return translation;
  } catch (err) {
    console.error("❌ Translation error for:", text);
    console.error("📛 Google Translate Error:", err.message);
    return text; // fallback (bad)
  }
};
