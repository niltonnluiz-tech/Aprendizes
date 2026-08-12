import React, { useState } from 'react';
import { ApprenticeRecord, SummaryMetrics, AIAnalysisResponse } from '../types';
import { useTheme } from '../context/ThemeContext';
import { generateFallbackAiAnalysis } from '../utils/aiFallback';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Building2,
  Bot,
} from 'lucide-react';

interface AiAnalysisViewProps {
  metrics: SummaryMetrics;
  topGrowth: ApprenticeRecord[];
  topDrops: ApprenticeRecord[];
}

export const AiAnalysisView: React.FC<AiAnalysisViewProps> = ({
  metrics,
  topGrowth,
  topDrops,
}) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);

  const generateAnalysis = async () => {
    setLoading(true);
    setError(null);
    setIsFallbackMode(false);
    try {
      const topGrowthSummary = topGrowth.slice(0, 6).map((r) => ({
        empresa: r.razaoSocial,
        dif: r.dif26vs24,
        pct: r.pct26vs24,
      }));

      const topDropsSummary = topDrops.slice(0, 6).map((r) => ({
        empresa: r.razaoSocial,
        dif: r.dif26vs24,
        pct: r.pct26vs24,
      }));

      const res = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: metrics,
          topGrowth: topGrowthSummary,
          topDrops: topDropsSummary,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAnalysis({
          sinteseExecutiva: json.data.sinteseExecutiva || json.data.summary || '',
          destaquesPositivos: json.data.destaquesPositivos || json.data.highlights2025 || [],
          alertasERiscos: json.data.alertasERiscos || json.data.criticalRisks || [],
          recomendacoesEstrategicas: json.data.recomendacoesEstrategicas || json.data.recommendations || [],
        });
      } else {
        // Fallback to local structured AI analysis
        setAnalysis(generateFallbackAiAnalysis(metrics));
        setIsFallbackMode(true);
        if (json.error) {
          setError(`Nota: Servidor sem chave Gemini (${json.error}). Exibindo parecer gerado por motor de diagnóstico local.`);
        }
      }
    } catch (err: any) {
      // Fallback on connection error
      setAnalysis(generateFallbackAiAnalysis(metrics));
      setIsFallbackMode(true);
      setError('Servidor da IA indisponível. Exibindo parecer gerado por motor de diagnóstico local.');
    } finally {
      setLoading(false);
    }
  };

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const innerBg = isCamp ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className="space-y-6">
      {/* Banner Top */}
      <div className={`${cardBg} border rounded-2xl p-6 space-y-4`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl ${isCamp ? 'bg-purple-50 border border-purple-200 text-purple-700' : 'bg-purple-500/20 border border-purple-500/30 text-purple-400'}`}>
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${textPrimary}`}>
                Parecer Técnico com Inteligência Artificial (Gemini)
              </h3>
              <p className={`text-xs ${textMuted} mt-0.5`}>
                Diagnóstico automatizado de causas de variação, riscos de cota e diretrizes para o CAMP Santo André
              </p>
            </div>
          </div>

          <button
            onClick={generateAnalysis}
            disabled={loading}
            className={`px-5 py-2.5 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              loading
                ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-300'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analisando com Gemini...</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                <span>{analysis ? 'Regerar Parecer de IA' : 'Gerar Parecer de IA Agora'}</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Analysis Output Container */}
      {analysis ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Executive Summary */}
          <div className={`${cardBg} border rounded-2xl p-6 space-y-3`}>
            <h4 className={`text-sm font-bold ${textPrimary} flex items-center gap-2`}>
              <FileText className="w-4 h-4 text-purple-500" />
              Síntese Executiva
            </h4>
            <p className={`text-xs ${isCamp ? 'text-slate-800' : 'text-slate-200'} leading-relaxed`}>{analysis.sinteseExecutiva}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Highlights */}
            <div className={`${cardBg} border rounded-2xl p-6 space-y-3`}>
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Destaques Positivos
              </h4>
              <ul className="space-y-2">
                {analysis.destaquesPositivos.map((item, idx) => (
                  <li key={idx} className={`text-xs ${isCamp ? 'text-slate-800' : 'text-slate-300'} flex items-start space-x-2`}>
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className={`${cardBg} border rounded-2xl p-6 space-y-3`}>
              <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Alertas e Riscos
              </h4>
              <ul className="space-y-2">
                {analysis.alertasERiscos.map((item, idx) => (
                  <li key={idx} className={`text-xs ${isCamp ? 'text-slate-800' : 'text-slate-300'} flex items-start space-x-2`}>
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className={`${cardBg} border rounded-2xl p-6 space-y-3`}>
            <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Recomendações Estratégicas para o CAMP Santo André
            </h4>
            <ul className="space-y-2">
              {analysis.recomendacoesEstrategicas.map((item, idx) => (
                <li key={idx} className={`text-xs ${isCamp ? 'text-slate-800' : 'text-slate-300'} flex items-start space-x-2`}>
                  <span className="text-amber-600 font-bold">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : !loading ? (
        /* Placeholder Banner */
        <div className={`${cardBg} border rounded-2xl p-10 text-center space-y-4`}>
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${isCamp ? 'bg-purple-50 text-purple-700' : 'bg-purple-500/10 text-purple-400'}`}>
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${textPrimary}`}>
              Pronto para gerar o parecer técnico com IA
            </h4>
            <p className={`text-xs ${textMuted} max-w-md mx-auto mt-1`}>
              Clique no botão acima para processar com a IA Gemini um diagnóstico dos dados do programa de aprendizagem do CAMP Santo André.
            </p>
          </div>
          <button
            onClick={generateAnalysis}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            Processar com IA
          </button>
        </div>
      ) : null}
    </div>
  );
};
