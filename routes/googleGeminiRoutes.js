import multer from "multer";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

const upload = multer({ dest: "uploads/" });
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const router = express.Router();

router.post("/voice", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  const myfile = await ai.files.upload({
    file: filePath,
    config: { mimeType: "audio/mp3" },
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent([
      createPartFromUri(myfile.uri, myfile.mimeType),
      "Transcript the given speech to text, don't need the timestampe."
    ])
  });

  res.json({ text: response.text() });
});

export default router;