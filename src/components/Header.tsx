import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  BarChart3,
  Building2,
  Lightbulb,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Download,
  Palette,
  Printer,
  FileText,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'table' | 'solutions' | 'ai' | 'pdf';
  setActiveTab: (tab: 'dashboard' | 'table' | 'solutions' | 'ai' | 'pdf') => void;
  isConsolidated: boolean;
  setIsConsolidated: (val: boolean) => void;
  rawCount: number;
  consolidatedCount: number;
  onExportCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isConsolidated,
  setIsConsolidated,
  rawCount,
  consolidatedCount,
  onExportCsv,
}) => {
  const { theme, setTheme } = useTheme();

  const isCampTheme = theme === 'camp';

  return (
    <header className={`no-print border-b text-white sticky top-0 z-30 shadow-lg transition-colors ${
      isCampTheme
        ? 'bg-[#0f2942] border-blue-900'
        : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title & Badge */}
          <div className="flex items-center space-x-3">
            {isCampTheme ? (
              <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md border border-emerald-400 shrink-0">
                CAMP
              </div>
            ) : (
              <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 shrink-0">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Painel de Aprendizes Ativos
                </h1>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  isCampTheme
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  2024 — 2026
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300/80 mt-0.5">
                {isCampTheme ? 'CAMP Santo André • Análise de Evolução e Retenção' : 'Análise comparativa de evolução, variações e soluções estratégicas'}
              </p>
            </div>
          </div>

          {/* Actions: Theme Switcher, Consolidation, Export, PDF View */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Theme Selector */}
            <div className={`p-1 rounded-xl border flex items-center text-xs ${
              isCampTheme ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-800/90 border-slate-700/80'
            }`}>
              <span className="px-2 text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                Tema:
              </span>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tema Escuro Padrão (Dark Executive)"
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('camp')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  theme === 'camp'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tema Institucional com cores do CAMP Santo André"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                CAMP Santo André
              </button>
            </div>

            {/* Original vs Consolidated View Toggle */}
            <div className={`p-1 rounded-xl border flex items-center text-xs ${
              isCampTheme ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-800/90 border-slate-700/80'
            }`}>
              <button
                id="btn-view-raw"
                onClick={() => setIsConsolidated(false)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  !isConsolidated
                    ? isCampTheme ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Visualiza todos os registros exatamente como estão na planilha original"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Original ({rawCount})</span>
              </button>
              <button
                id="btn-view-consolidated"
                onClick={() => setIsConsolidated(true)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  isConsolidated
                    ? isCampTheme ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Unifica empresas duplicadas ou filiais com variações no nome"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Consolidado ({consolidatedCount})</span>
              </button>
            </div>

            {/* Export CSV Button */}
            <button
              id="btn-export-csv"
              onClick={onExportCsv}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-4 pt-3 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? isCampTheme
                  ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold'
                  : 'bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Dashboard Executivo</span>
          </button>

          <button
            id="tab-table"
            onClick={() => setActiveTab('table')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'table'
                ? isCampTheme
                  ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold'
                  : 'bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>Empresas & Detalhes</span>
          </button>

          <button
            id="tab-solutions"
            onClick={() => setActiveTab('solutions')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'solutions'
                ? isCampTheme
                  ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold'
                  : 'bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Soluções & Projeções</span>
          </button>

          <button
            id="tab-ai"
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/50 text-purple-300 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Parecer de IA</span>
          </button>

          {/* New Tab: PDF Report */}
          <button
            id="tab-pdf"
            onClick={() => setActiveTab('pdf')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'pdf'
                ? 'bg-emerald-600 text-white shadow-md border border-emerald-400'
                : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Visualizar Relatório PDF</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
