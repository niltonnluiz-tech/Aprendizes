import { runGeminiAnalysis } from "../src/server/geminiService";

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { summary, topGrowth, topDrops } = body || {};
    const data = await runGeminiAnalysis({ summary, topGrowth, topDrops });
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("Erro na Vercel Function:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Erro no processamento da IA no Vercel",
    });
  }
}
