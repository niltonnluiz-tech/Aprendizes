import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { runGeminiAnalysis } from "./src/server/geminiService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoint for AI Executive Analysis
app.post("/api/ai-analysis", async (req, res) => {
  try {
    const { summary, topGrowth, topDrops } = req.body;
    const data = await runGeminiAnalysis({ summary, topGrowth, topDrops });
    res.json({
      success: true,
      data
    });
  } catch (err: any) {
    console.error("Erro no processamento da IA:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Erro interno ao gerar análise por IA"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
