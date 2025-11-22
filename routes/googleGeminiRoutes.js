import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const router = express.Router();

router.post("/voice", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📥 Received audio:", req.file.path);

    // Read file
    const audioBuffer = fs.readFileSync(req.file.path);

    // Upload to Gemini with ALL required fields
    const uploaded = await ai.files.upload({
      file: audioBuffer,
      name: req.file.originalname || "voice.wav",

      // REQUIRED FOR GEMINI
      mimeType: "audio/wav",
      sizeBytes: audioBuffer.length,

      config: {
        mimeType: "audio/wav",
      }
    });

    console.log("🎉 Uploaded to Gemini:", uploaded.file.uri);

    // Transcribe using Gemini
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: uploaded.file.uri,
                mimeType: "audio/wav"
              }
            },
            { text: "Transcribe this audio clearly." }
          ]
        }
      ]
    });

    res.json({ text: result.response.text() });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Failed to process audio" });
  }
});

export default router;
