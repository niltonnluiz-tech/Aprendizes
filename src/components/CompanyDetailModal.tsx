import React from 'react';
import { ApprenticeRecord } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  Building2,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface CompanyDetailModalProps {
  record: ApprenticeRecord | null;
  onClose: () => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  record,
  onClose,
}) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  if (!record) return null;

  const isGrowth = record.dif26vs24 > 0;
  const isDrop = record.dif26vs24 < 0;

  const modalBg = isCamp ? 'bg-white text-slate-900 border-slate-200' : 'bg-slate-900 text-slate-100 border-slate-800';
  const cardBoxBg = isCamp ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className={`${modalBg} border rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-6`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            isCamp ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start space-x-3 pr-8">
          <div className={`p-3 rounded-2xl shrink-0 ${isCamp ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-400'}`}>
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider block ${isCamp ? 'text-emerald-800' : 'text-blue-400'}`}>
              {record.sector}
            </span>
            <h2 className={`text-xl font-bold mt-1 leading-snug ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>
              {record.razaoSocial}
            </h2>
            {record.normalizedName !== record.razaoSocial && (
              <p className={`text-xs mt-1 ${textMuted}`}>
                Nome padronizado/Grupo: <span className="font-semibold text-slate-800 dark:text-slate-200">{record.normalizedName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Year Metric Comparison Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`${cardBoxBg} p-4 rounded-xl border text-center`}>
            <span className={`text-xs font-bold block ${textMuted}`}>Julho / 2024</span>
            <span className={`text-2xl font-black block mt-1 ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>{record.y2024}</span>
            <span className={`text-[10px] block mt-0.5 ${textMuted}`}>Aprendizes Ativos</span>
          </div>

          <div className={`${cardBoxBg} p-4 rounded-xl border text-center`}>
            <span className={`text-xs font-bold block ${textMuted}`}>Julho / 2025</span>
            <span className={`text-2xl font-black block mt-1 ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>{record.y2025}</span>
            <span className={`text-[10px] font-bold block mt-0.5 ${record.dif25vs24 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              Δ {record.dif25vs24 > 0 ? `+${record.dif25vs24}` : record.dif25vs24}
            </span>
          </div>

          <div className={`${cardBoxBg} p-4 rounded-xl border text-center`}>
            <span className={`text-xs font-bold block ${textMuted}`}>Julho / 2026</span>
            <span className={`text-2xl font-black block mt-1 ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>{record.y2026}</span>
            <span className={`text-[10px] font-bold block mt-0.5 ${record.dif26vs25 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              Δ {record.dif26vs25 > 0 ? `+${record.dif26vs25}` : record.dif26vs25}
            </span>
          </div>
        </div>

        {/* Total Evolution & Status Banner */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isGrowth
            ? isCamp ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
            : isDrop
            ? isCamp ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
            : isCamp ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-800/80 border-slate-700 text-slate-300'
        }`}>
          <div className="flex items-center space-x-3">
            {isGrowth ? (
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            ) : isDrop ? (
              <TrendingDown className="w-6 h-6 text-rose-600" />
            ) : (
              <Activity className="w-6 h-6 text-slate-500" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">
                Variação Acumulada (2024 a 2026)
              </span>
              <p className="text-sm font-semibold mt-0.5">
                {isGrowth
                  ? `Expansão de +${record.dif26vs24} aprendizes (${record.pct26vs24}%)`
                  : isDrop
                  ? `Redução de ${record.dif26vs24} aprendizes (${record.pct26vs24}%)`
                  : 'Manutenção de quadro exatamente estável'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black">
              {record.dif26vs24 > 0 ? `+${record.dif26vs24}` : record.dif26vs24}
            </span>
          </div>
        </div>

        {/* Diagnosis & Recommendations */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isCamp ? 'text-[#0f2942]' : 'text-white'} flex items-center gap-1.5`}>
            <FileText className="w-4 h-4 text-emerald-600" />
            Diagnóstico Recomendado para o CAMP Santo André
          </h4>

          <div className={`${cardBoxBg} p-4 rounded-xl border text-xs space-y-2`}>
            {record.y2026 === 0 ? (
              <div className="flex items-start space-x-2 text-rose-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Atenção Crítica:</strong> A empresa consta com 0 aprendizes em Julho/2026. Agendar contato urgente para verificar cumprimento da cota legal ou reabertura de turmas.
                </span>
              </div>
            ) : isGrowth ? (
              <div className="flex items-start space-x-2 text-emerald-600 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Empresa Parceira em Expansão:</strong> Aumentou seu quadro de aprendizes. Excelente oportunidade para offering de novos cursos ou programas de capacitação continuada.
                </span>
              </div>
            ) : isDrop ? (
              <div className="flex items-start space-x-2 text-amber-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Acompanhamento de Redução:</strong> Apresentou queda na contratação. Avaliar motivos e apresentar soluções do programa de aprendizagem do CAMP Santo André.
                </span>
              </div>
            ) : (
              <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400 font-medium">
                <Activity className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Quadro Estável:</strong> A empresa manteve exatamente a mesma quantidade de aprendizes ao longo do período monitorado.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
              isCamp ? 'bg-[#0f2942] hover:bg-[#123352] text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            Fechar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
