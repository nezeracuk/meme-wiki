import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const memesFilePath = path.join(__dirname, "src", "data", "memes.json");
const originalMemesFilePath = path.join(__dirname, "src", "data", "original-memes.json");

(async () => {
  try {
    await fs.access(originalMemesFilePath);
  } catch (error) {
    const originalData = await fs.readFile(memesFilePath, "utf-8");
    await fs.writeFile(originalMemesFilePath, originalData);
  }
})();

app.get("/api/memes", async (req, res) => {
  try {
    const data = await fs.readFile(memesFilePath, "utf-8");
    const memes = JSON.parse(data);

    if (!Array.isArray(memes)) {
      console.error("Memes data is not an array:", typeof memes);
      return res.json([]);
    }

    res.json(memes);
  } catch (error) {
    console.error("Error retrieving memes:", error);
    res.status(500).json({ error: "Failed to retrieve memes" });
  }
});

app.get("/api/memes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile(memesFilePath, "utf-8");
    const memes = JSON.parse(data);
    const meme = memes.find((m) => m.id === id);

    if (!meme) {
      return res.status(404).json({ error: "Meme not found" });
    }

    res.json(meme);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve meme" });
  }
});

app.put("/api/memes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile(memesFilePath, "utf-8");
    let memes = JSON.parse(data);
    const memeIndex = memes.findIndex((m) => m.id === id);

    if (memeIndex === -1) {
      return res.status(404).json({ error: "Meme not found" });
    }

    memes[memeIndex] = {
      ...memes[memeIndex],
      ...req.body,
      id: id,
    };

    await fs.writeFile(memesFilePath, JSON.stringify(memes, null, 2));
    res.json(memes[memeIndex]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update meme" });
  }
});

app.post("/api/memes/reset", async (req, res) => {
  try {
    const originalData = await fs.readFile(originalMemesFilePath, "utf-8");
    await fs.writeFile(memesFilePath, originalData);
    res.json(JSON.parse(originalData));
  } catch (error) {
    res.status(500).json({ error: "Failed to reset memes data" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
