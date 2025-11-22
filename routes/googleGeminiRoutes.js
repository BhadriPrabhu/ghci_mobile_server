import multer from "multer";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import express from "express";
import path from "path";

const upload = multer({ dest: "uploads/" });
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const router = express.Router();

router.post("/voice", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname) || ".wav";

    // Correct MIME type for React Native .wav
    const mimeType = "audio/wav";

    console.log("Received audio:", filePath);

    const uploaded = await ai.files.upload({
      file: filePath,
      config: { mimeType },
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(uploaded.uri, mimeType),
        "Transcribe the given speech to text (no timestamps)."
      ])
    });

    res.json({ text: result.text() });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Failed to process audio" });
  }
});

export default router;
