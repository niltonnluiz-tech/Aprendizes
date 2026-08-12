import React, { useState, useMemo } from 'react';
import {
  parseRawCsvData,
  getConsolidatedRecords,
  computeMetrics,
} from './data/apprenticeData';
import { ApprenticeRecord } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { ChartsSection } from './components/ChartsSection';
import { CompanyTable } from './components/CompanyTable';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { SolutionsHub } from './components/SolutionsHub';
import { AiAnalysisView } from './components/AiAnalysisView';
import { PdfReportViewer } from './components/PdfReportViewer';
import { exportToCsv } from './utils/exportCsv';
import { FileSpreadsheet, Building2, BarChart3, Sparkles, Lightbulb } from 'lucide-react';

function AppContent() {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const [activeTab, setActiveTab] = useState<'dashboard' | 'table' | 'solutions' | 'ai' | 'pdf'>('dashboard');
  const [isConsolidated, setIsConsolidated] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<ApprenticeRecord | null>(null);

  // Parse raw dataset
  const rawRecords = useMemo(() => parseRawCsvData(), []);

  // Compute consolidated dataset
  const consolidatedRecords = useMemo(() => getConsolidatedRecords(rawRecords), [rawRecords]);

  // Current active records set
  const activeRecords = isConsolidated ? consolidatedRecords : rawRecords;

  // Compute summary metrics
  const metrics = useMemo(() => computeMetrics(activeRecords), [activeRecords]);

  // Top Growth and Top Drops for AI analysis
  const topGrowthCompanies = useMemo(() => {
    return [...consolidatedRecords]
      .sort((a, b) => b.dif26vs24 - a.dif26vs24)
      .slice(0, 10);
  }, [consolidatedRecords]);

  const topDropCompanies = useMemo(() => {
    return [...consolidatedRecords]
      .sort((a, b) => a.dif26vs24 - b.dif26vs24)
      .slice(0, 10);
  }, [consolidatedRecords]);

  const handleExportCsv = () => {
    exportToCsv(
      activeRecords,
      isConsolidated ? 'aprendizes_ativos_consolidado_2024_2026.csv' : 'aprendizes_ativos_detalhado_2024_2026.csv'
    );
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${
      isCamp
        ? 'bg-[#f1f5f9] text-slate-900 selection:bg-emerald-500 selection:text-white'
        : 'bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white'
    }`}>
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConsolidated={isConsolidated}
        setIsConsolidated={setIsConsolidated}
        rawCount={rawRecords.length}
        consolidatedCount={consolidatedRecords.length}
        onExportCsv={handleExportCsv}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tab 1: Dashboard Executivo */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards */}
            <KPICards metrics={metrics} />

            {/* Interactive Charts */}
            <ChartsSection
              records={activeRecords}
              metrics={metrics}
              onSelectCompany={(rec) => setSelectedCompany(rec)}
            />

            {/* Preview Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${isCamp ? 'text-[#0f2942]' : 'text-white'}`}>
                    <Building2 className={`w-5 h-5 ${isCamp ? 'text-emerald-700' : 'text-indigo-400'}`} />
                    Principais Movimentações por Empresa
                  </h3>
                  <p className={`text-xs ${isCamp ? 'text-slate-600' : 'text-slate-400'}`}>
                    Acesse a lista completa com busca, filtros e ordenação personalizada
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors border cursor-pointer ${
                    isCamp
                      ? 'bg-white hover:bg-slate-50 text-emerald-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-blue-400 border-slate-700'
                  }`}
                >
                  Ver Tabela Completa ({activeRecords.length} empresas) ➔
                </button>
              </div>

              <CompanyTable
                records={activeRecords}
                isConsolidated={isConsolidated}
                onSelectCompany={(rec) => setSelectedCompany(rec)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Companies & Details */}
        {activeTab === 'table' && (
          <div className="space-y-6 animate-fadeIn">
            <CompanyTable
              records={activeRecords}
              isConsolidated={isConsolidated}
              onSelectCompany={(rec) => setSelectedCompany(rec)}
            />
          </div>
        )}

        {/* Tab 3: Solutions Hub */}
        {activeTab === 'solutions' && (
          <div className="animate-fadeIn">
            <SolutionsHub
              metrics={metrics}
              rawRecords={rawRecords}
              consolidatedRecords={consolidatedRecords}
            />
          </div>
        )}

        {/* Tab 4: AI Analysis */}
        {activeTab === 'ai' && (
          <div className="animate-fadeIn">
            <AiAnalysisView
              metrics={metrics}
              topGrowth={topGrowthCompanies}
              topDrops={topDropCompanies}
            />
          </div>
        )}

        {/* Tab 5: PDF Report Viewer */}
        {activeTab === 'pdf' && (
          <div className="animate-fadeIn">
            <PdfReportViewer
              metrics={metrics}
              consolidatedRecords={consolidatedRecords}
            />
          </div>
        )}
      </main>

      {/* Footer (hidden on print) */}
      <footer className={`no-print border-t text-xs py-6 mt-12 transition-colors ${
        isCamp
          ? 'bg-[#0f2942] border-blue-900 text-slate-300'
          : 'bg-slate-900 border-slate-800 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {isCamp ? (
              <span className="font-black text-emerald-400 text-sm">CAMP Santo André</span>
            ) : (
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            )}
            <span className="font-medium">
              Painel de Análise de Aprendizes Ativos (2024 - 2026)
            </span>
          </div>
          <div>
            Acompanhamento de evoluções, variações anuais e soluções de governança corporativa.
          </div>
        </div>
      </footer>

      {/* Company Detail Modal */}
      <CompanyDetailModal
        record={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
