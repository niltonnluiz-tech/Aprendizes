import { GoogleGenAI, Type } from "@google/genai";

export interface AnalysisInput {
  summary: {
    total2024: number;
    total2025: number;
    total2026: number;
    dif25vs24: number;
    dif26vs25: number;
    dif26vs24: number;
    pct25vs24: number;
    pct26vs25: number;
    pct26vs24: number;
    activeCompanies2024?: number;
    activeCompanies2025?: number;
    activeCompanies2026?: number;
  };
  topGrowth: Array<{ empresa: string; dif: number; pct: number }>;
  topDrops: Array<{ empresa: string; dif: number; pct: number }>;
}

export interface FormattedAnalysisOutput {
  sinteseExecutiva: string;
  destaquesPositivos: string[];
  alertasERiscos: string[];
  recomendacoesEstrategicas: string[];
}

export async function runGeminiAnalysis(input: AnalysisInput): Promise<FormattedAnalysisOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada no ambiente do servidor.");
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const prompt = `Você é um consultor especialista em Políticas Públicas de Emprego, Direito do Trabalho e Programa Jovem Aprendiz do CAMP Santo André no Brasil.
Análise os dados consolidados de aprendizes ativos no período de 2024 a 2026:

Resumo Geral de Aprendizes:
- Julho/2024: ${input.summary?.total2024} aprendizes ativos
- Julho/2025: ${input.summary?.total2025} aprendizes ativos (Diferença 25 vs 24: ${input.summary?.dif25vs24 > 0 ? '+' : ''}${input.summary?.dif25vs24}, ${input.summary?.pct25vs24}%)
- Julho/2026: ${input.summary?.total2026} aprendizes ativos (Diferença 26 vs 25: ${input.summary?.dif26vs25 > 0 ? '+' : ''}${input.summary?.dif26vs25}, ${input.summary?.pct26vs25}%)
- Balanço Acumulado (2026 vs 2024): ${input.summary?.dif26vs24 > 0 ? '+' : ''}${input.summary?.dif26vs24} aprendizes (${input.summary?.pct26vs24}%)

Empresas com Maior Crescimento (2024-2026):
${JSON.stringify(input.topGrowth || [], null, 2)}

Empresas com Maior Redução/Queda (2024-2026):
${JSON.stringify(input.topDrops || [], null, 2)}

Forneça um parecer executivo estruturado em Português do Brasil no formato JSON estrito contendo:
1. sinteseExecutiva: Resumo da situação geral e curva de evolução (2024->2025 e 2025->2026).
2. destaquesPositivos: Três pontos positivos marcantes do período (2024-2026).
3. alertasERiscos: Três pontos críticos/riscos observados (como retração em grandes parceiros).
4. recomendacoesEstrategicas: Quatro recomendações práticas para o CAMP Santo André reforçar parcerias e fiscalização de cota legal.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sinteseExecutiva: { type: Type.STRING, description: "Síntese executiva abrangente" },
          destaquesPositivos: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Principais destaques positivos"
          },
          alertasERiscos: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Alertas e riscos de retração"
          },
          recomendacoesEstrategicas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Recomendações estratégicas prioritárias"
          }
        },
        required: ["sinteseExecutiva", "destaquesPositivos", "alertasERiscos", "recomendacoesEstrategicas"]
      }
    }
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("Resposta vazia retornada pelo modelo Gemini.");
  }

  const parsed = JSON.parse(jsonText);
  return {
    sinteseExecutiva: parsed.sinteseExecutiva || parsed.summary || "",
    destaquesPositivos: parsed.destaquesPositivos || parsed.highlights2025 || parsed.highlights2026 || [],
    alertasERiscos: parsed.alertasERiscos || parsed.criticalRisks || [],
    recomendacoesEstrategicas: parsed.recomendacoesEstrategicas || parsed.recommendations || [],
  };
}
