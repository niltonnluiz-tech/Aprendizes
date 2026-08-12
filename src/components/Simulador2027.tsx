import React, { useState } from 'react';
import { SummaryMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Target, TrendingUp, Calculator, ShieldCheck } from 'lucide-react';

interface Simulador2027Props {
  metrics: SummaryMetrics;
}

export const Simulador2027: React.FC<Simulador2027Props> = ({ metrics }) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const [targetGrowthPercent, setTargetGrowthPercent] = useState<number>(8);
  const [reactivationCount, setReactivationCount] = useState<number>(5);

  const base2026 = metrics.total2026;
  const growthMultiplier = 1 + targetGrowthPercent / 100;
  const projected2027 = Math.round(base2026 * growthMultiplier + reactivationCount);
  const projectedIncrease = projected2027 - base2026;

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const innerBg = isCamp ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className={`${cardBg} border rounded-2xl p-6 space-y-6`}>
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-2xl ${isCamp ? 'bg-amber-50 border border-amber-200 text-amber-700' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'}`}>
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`text-base font-bold ${textPrimary}`}>
            Simulador de Metas e Projeção de Aprendizes para 2027
          </h3>
          <p className={`text-xs ${textMuted}`}>
            Estime a quantidade necessária de aprendizes ativos com base na expansão das empresas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className={`lg:col-span-6 ${innerBg} border rounded-xl p-5 space-y-4`}>
          <div>
            <label className={`text-xs font-semibold block mb-2 ${isCamp ? 'text-slate-800' : 'text-slate-300'}`}>
              Meta de Crescimento Orgânico das Empresas (% sobre 2026)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-10"
                max="25"
                step="1"
                value={targetGrowthPercent}
                onChange={(e) => setTargetGrowthPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className={`text-sm font-bold w-16 text-right px-2 py-1 rounded border ${
                isCamp ? 'bg-white border-slate-300 text-emerald-800' : 'bg-slate-900 border-slate-700 text-emerald-400'
              }`}>
                {targetGrowthPercent > 0 ? `+${targetGrowthPercent}%` : `${targetGrowthPercent}%`}
              </span>
            </div>
          </div>

          <div>
            <label className={`text-xs font-semibold block mb-2 ${isCamp ? 'text-slate-800' : 'text-slate-300'}`}>
              Reativação/Captação de Novas Empresas Parceiras (empresas)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={reactivationCount}
                onChange={(e) => setReactivationCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className={`text-sm font-bold w-16 text-right px-2 py-1 rounded border ${
                isCamp ? 'bg-white border-slate-300 text-blue-800' : 'bg-slate-900 border-slate-700 text-blue-400'
              }`}>
                +{reactivationCount} emp.
              </span>
            </div>
          </div>
        </div>

        {/* Projections Output */}
        <div className={`lg:col-span-6 border rounded-xl p-5 flex flex-col justify-between ${
          isCamp ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
              Projeção de Quadro para Julho / 2027
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className={`text-4xl font-black ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>{projected2027}</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 ml-2">aprendizes estimados</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  Δ 2027 vs 2026: {projectedIncrease >= 0 ? `+${projectedIncrease}` : projectedIncrease}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-500/20 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Cenário projetado atinge recuperação do contingente histórico do CAMP Santo André.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
