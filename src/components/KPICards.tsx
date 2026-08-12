import React from 'react';
import { SummaryMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Building2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface KPICardsProps {
  metrics: SummaryMetrics;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-500' : 'text-slate-400';
  const borderDivider = isCamp ? 'border-slate-200' : 'border-slate-800/80';
  const badgeBg = isCamp ? 'bg-slate-100 text-slate-700 font-bold' : 'bg-slate-800 text-slate-300';

  return (
    <div className="space-y-6">
      {/* Primary Year Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total 2024 */}
        <div id="card-kpi-2024" className={`${cardBg} border rounded-2xl p-5 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${textMuted} text-xs font-semibold uppercase tracking-wider`}>
              <Calendar className={`w-4 h-4 ${isCamp ? 'text-blue-600' : 'text-blue-400'}`} />
              <span>Julho / 2024</span>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeBg}`}>
              Ano Base
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className={`text-3xl font-extrabold tracking-tight ${textPrimary}`}>
                {metrics.total2024}
              </span>
              <span className={`text-xs ml-2 ${textMuted}`}>aprendizes ativos</span>
            </div>
            <Users className={`w-8 h-8 ${isCamp ? 'text-slate-300' : 'text-slate-700'}`} />
          </div>
          <div className={`mt-4 pt-3 border-t ${borderDivider} flex items-center justify-between text-xs ${textMuted}`}>
            <span>Empresas com aprendizes:</span>
            <span className={`font-semibold ${isCamp ? 'text-slate-800' : 'text-slate-200'}`}>
              {metrics.activeCompanies2024} de {metrics.totalCompaniesCount}
            </span>
          </div>
        </div>

        {/* Total 2025 & Dif 25 vs 24 */}
        <div id="card-kpi-2025" className={`${cardBg} border rounded-2xl p-5 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${textMuted} text-xs font-semibold uppercase tracking-wider`}>
              <Calendar className={`w-4 h-4 ${isCamp ? 'text-emerald-600' : 'text-indigo-400'}`} />
              <span>Julho / 2025</span>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                metrics.dif25vs24 >= 0
                  ? isCamp ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : isCamp ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {metrics.dif25vs24 >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>
                {metrics.dif25vs24 > 0 ? `+${metrics.dif25vs24}` : metrics.dif25vs24} ({metrics.pct25vs24}%)
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className={`text-3xl font-extrabold tracking-tight ${textPrimary}`}>
                {metrics.total2025}
              </span>
              <span className={`text-xs ml-2 ${textMuted}`}>aprendizes ativos</span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold block ${textMuted}`}>Δ 2025 vs 2024</span>
              <span
                className={`text-sm font-bold ${
                  metrics.dif25vs24 >= 0 ? isCamp ? 'text-emerald-700' : 'text-emerald-400' : isCamp ? 'text-rose-600' : 'text-rose-400'
                }`}
              >
                {metrics.dif25vs24 > 0 ? `+${metrics.dif25vs24}` : metrics.dif25vs24} aprendizes
              </span>
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${borderDivider} flex items-center justify-between text-xs ${textMuted}`}>
            <span>Empresas em alta em 2025:</span>
            <span className={`font-semibold ${isCamp ? 'text-emerald-700' : 'text-emerald-400'}`}>
              {metrics.growingCompanies25vs24} empresas
            </span>
          </div>
        </div>

        {/* Total 2026 & Dif 26 vs 25 */}
        <div id="card-kpi-2026" className={`${cardBg} border rounded-2xl p-5 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${textMuted} text-xs font-semibold uppercase tracking-wider`}>
              <Calendar className={`w-4 h-4 ${isCamp ? 'text-orange-600' : 'text-purple-400'}`} />
              <span>Julho / 2026</span>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                metrics.dif26vs25 >= 0
                  ? isCamp ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : isCamp ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {metrics.dif26vs25 >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>
                {metrics.dif26vs25 > 0 ? `+${metrics.dif26vs25}` : metrics.dif26vs25} ({metrics.pct26vs25}%)
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className={`text-3xl font-extrabold tracking-tight ${textPrimary}`}>
                {metrics.total2026}
              </span>
              <span className={`text-xs ml-2 ${textMuted}`}>aprendizes ativos</span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold block ${textMuted}`}>Δ 2026 vs 2025</span>
              <span
                className={`text-sm font-bold ${
                  metrics.dif26vs25 >= 0 ? isCamp ? 'text-emerald-700' : 'text-emerald-400' : isCamp ? 'text-rose-600' : 'text-rose-400'
                }`}
              >
                {metrics.dif26vs25 > 0 ? `+${metrics.dif26vs25}` : metrics.dif26vs25} aprendizes
              </span>
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${borderDivider} flex items-center justify-between text-xs ${textMuted}`}>
            <span>Empresas em alta em 2026:</span>
            <span className={`font-semibold ${isCamp ? 'text-emerald-700' : 'text-emerald-400'}`}>
              {metrics.growingCompanies26vs25} empresas
            </span>
          </div>
        </div>
      </div>

      {/* Highlights Banner / Overall 3-Year Summary */}
      <div
        id="card-three-year-summary"
        className={`border rounded-2xl p-5 shadow-sm ${
          isCamp
            ? 'bg-gradient-to-r from-[#0f2942] to-[#123352] text-white border-blue-900'
            : 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-slate-800'
        }`}
      >
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x ${isCamp ? 'divide-blue-800/80' : 'divide-slate-800'}`}>
          <div className="pr-4">
            <span className={`text-xs font-semibold uppercase tracking-wider block ${isCamp ? 'text-emerald-400' : 'text-slate-400'}`}>
              Balanço Geral (2024 ➔ 2026)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`text-2xl font-black ${
                  metrics.dif26vs24 >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {metrics.dif26vs24 > 0 ? `+${metrics.dif26vs24}` : metrics.dif26vs24}
              </span>
              <span className="text-xs font-bold text-slate-300">
                ({metrics.pct26vs24}%)
              </span>
            </div>
            <p className="text-xs text-slate-300/80 mt-1">
              Variação líquida em 2 anos de acompanhamento
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:px-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Base de Empresas</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-white">
                {metrics.totalCompaniesCount}
              </span>
              <span className="text-xs text-slate-300 ml-2">empresas na amostra</span>
            </div>
            <p className="text-xs text-slate-300/80 mt-1">
              {metrics.activeCompanies2026} ativas com aprendizes em 2026
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:px-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dinâmica de Expansão</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div>
                <span className="text-xs text-slate-300 block">2025 vs 2024</span>
                <span className="text-sm font-bold text-emerald-400">
                  {metrics.growingCompanies25vs24} subiram
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-xs text-slate-300 block">2026 vs 2025</span>
                <span className="text-sm font-bold text-emerald-400">
                  {metrics.growingCompanies26vs25} subiram
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Pontos de Atenção</span>
            </div>
            <div className="mt-2">
              <span className="text-xs text-slate-300 block">Redução em 2026 vs 2025:</span>
              <span className="text-sm font-bold text-rose-400">
                {metrics.fallingCompanies26vs25} empresas reduziram
              </span>
            </div>
            <p className="text-xs text-slate-300/80 mt-1">
              {metrics.stableCompanies26vs25} mantiveram o quadro estável
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
