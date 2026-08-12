import React, { useState } from 'react';
import { ApprenticeRecord, SummaryMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Printer,
  Download,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Award,
} from 'lucide-react';

interface PdfReportViewerProps {
  metrics: SummaryMetrics;
  consolidatedRecords: ApprenticeRecord[];
  onClose?: () => void;
}

export const PdfReportViewer: React.FC<PdfReportViewerProps> = ({
  metrics,
  consolidatedRecords,
  onClose,
}) => {
  const { theme } = useTheme();
  const [zoom, setZoom] = useState<number>(100);
  const [activePage, setActivePage] = useState<number>(1);
  const totalPages = 4;

  const handlePrint = () => {
    window.print();
  };

  // Group by Sector for PDF section
  const sectorData = React.useMemo(() => {
    const map = new Map<string, { y24: number; y25: number; y26: number; count: number }>();
    consolidatedRecords.forEach((r) => {
      const curr = map.get(r.sector) || { y24: 0, y25: 0, y26: 0, count: 0 };
      map.set(r.sector, {
        y24: curr.y24 + r.y2024,
        y25: curr.y25 + r.y2025,
        y26: curr.y26 + r.y2026,
        count: curr.count + 1,
      });
    });

    return Array.from(map.entries())
      .map(([sector, val]) => ({
        sector,
        y24: val.y24,
        y25: val.y25,
        y26: val.y26,
        dif26vs24: val.y26 - val.y24,
        pct26vs24: val.y24 > 0 ? Math.round(((val.y26 - val.y24) / val.y24) * 100) : 0,
        count: val.count,
      }))
      .sort((a, b) => b.y26 - a.y26);
  }, [consolidatedRecords]);

  // Top Growth and Drops
  const topGrowth = React.useMemo(() => {
    return [...consolidatedRecords]
      .sort((a, b) => b.dif26vs24 - a.dif26vs24)
      .slice(0, 8);
  }, [consolidatedRecords]);

  const topDrops = React.useMemo(() => {
    return [...consolidatedRecords]
      .sort((a, b) => a.dif26vs24 - b.dif26vs24)
      .slice(0, 8);
  }, [consolidatedRecords]);

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* On-screen Toolbar (Hidden during print) */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-20">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">Visualizador de Relatório em PDF</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Formato Impressão A4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualize o documento oficial formatado na tela e imprima ou salve como PDF
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setZoom((z) => Math.max(60, z - 10))}
              className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors"
              title="Reduzir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-slate-300 font-medium min-w-[45px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors ml-1"
              title="Resetar Zoom (100%)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Page Jump */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs text-slate-300">
            <button
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="p-1.5 hover:bg-slate-800 disabled:opacity-40 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium">
              Página {activePage} de {totalPages}
            </span>
            <button
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="p-1.5 hover:bg-slate-800 disabled:opacity-40 rounded-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar em PDF</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PDF Document Viewer Container */}
      <div className="pdf-viewer-stage bg-slate-950 p-4 md:p-8 rounded-2xl border border-slate-800 overflow-x-auto flex flex-col items-center gap-8 select-text">
        {/* Paper Container scaled by Zoom */}
        <div
          className="transition-all duration-200 origin-top flex flex-col items-center gap-8 w-full"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* PAGE 1: CAPA & RESUMO MACRO */}
          <div
            id="pdf-page-1"
            className={`pdf-page bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 md:p-12 shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between relative ${
              activePage !== 1 && 'hidden md:flex'
            }`}
            style={{ boxSizing: 'border-box' }}
          >
            {/* Page Header */}
            <div>
              {/* Institutional Header */}
              <div className="border-b-2 border-[#0f2942] pb-6 mb-6 flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#0f2942] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-emerald-500">
                    CAMP
                  </div>
                  <div>
                    <h1 className="text-lg font-black text-[#0f2942] tracking-tight uppercase">
                      CAMP Santo André
                    </h1>
                    <p className="text-xs font-semibold text-emerald-700">
                      Círculo de Amigos dos Menores Patrulheiros de Santo André
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Fundação Rotária Piero Pollone • Desde 1976
                    </p>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <p className="font-bold text-slate-800">DOCUMENTO OFICIAL</p>
                  <p>Emissão: {currentDate}</p>
                  <p>Versão: Consolidada (2024-2026)</p>
                </div>
              </div>

              {/* Document Title */}
              <div className="bg-slate-50 border-l-4 border-emerald-600 p-5 rounded-r-xl mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Relatório Executivo de Acompanhamento
                </span>
                <h2 className="text-xl font-black text-[#0f2942] mt-1">
                  Progressão de Aprendizes Ativos por Empresa (2024 a 2026)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Análise comparativa das medições anuais de Julho/2024, Julho/2025 e Julho/2026 em Santo André e Região
                </p>
              </div>

              {/* Key Indicators Table */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2942] border-b pb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Resumo Macroeconômico dos Aprendizes
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Julho / 2024</span>
                    <span className="text-3xl font-black text-[#0f2942] block mt-1">{metrics.total2024}</span>
                    <span className="text-[10px] text-slate-500 block">Ano Base</span>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Julho / 2025</span>
                    <span className="text-3xl font-black text-[#0f2942] block mt-1">{metrics.total2025}</span>
                    <span className="text-xs font-bold text-rose-600 block mt-0.5">
                      {metrics.dif25vs24} ({metrics.pct25vs24}%)
                    </span>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block">Julho / 2026</span>
                    <span className="text-3xl font-black text-emerald-900 block mt-1">{metrics.total2026}</span>
                    <span className="text-xs font-bold text-rose-600 block mt-0.5">
                      {metrics.dif26vs25} ({metrics.pct26vs25}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Overall Balance Highlight Box */}
              <div className="bg-[#0f2942] text-white p-5 rounded-xl shadow-sm mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Balanço Acumulado do Período (2024 ➔ 2026)
                  </span>
                  <p className="text-sm text-slate-200 mt-1">
                    Redução total de <strong>58 vagas ativas</strong> de aprendizagem ao longo de 24 meses.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-rose-400 block">-10,7%</span>
                  <span className="text-[10px] text-slate-300">Variação Geral</span>
                </div>
              </div>

              {/* Summary Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-[#0f2942] block mb-1">Empresas Monitoradas</span>
                  <p className="text-slate-600">
                    Amostra consolidada de <strong>{metrics.totalCompaniesCount} grupos econômicos</strong> ({metrics.activeCompanies2026} ativas com aprendizes em 2026).
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-[#0f2942] block mb-1">Dinâmica de Retração</span>
                  <p className="text-slate-600">
                    <strong>{metrics.fallingCompanies26vs25} empresas</strong> reduziram contratações em 2026, enquanto {metrics.growingCompanies26vs25} expandiram seu quadro.
                  </p>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="border-t pt-4 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CAMP Santo André • Relatório de Gestão da Aprendizagem</span>
              <span>Página 1 de 4</span>
            </div>
          </div>

          {/* PAGE 2: SECTORS & TOP MOVEMENTS */}
          <div
            id="pdf-page-2"
            className={`pdf-page bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 md:p-12 shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between relative ${
              activePage !== 2 && 'hidden md:flex'
            }`}
            style={{ boxSizing: 'border-box' }}
          >
            <div>
              {/* Mini Header */}
              <div className="border-b pb-3 mb-6 flex justify-between items-center text-xs text-slate-500">
                <span className="font-bold text-[#0f2942]">CAMP Santo André • Análise Setorial e Destaques</span>
                <span>Julho/2024 a Julho/2026</span>
              </div>

              {/* Sector Table */}
              <div className="mb-8">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2942] border-b pb-1.5 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" /> Distribuição por Setor Econômico
                </h3>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0f2942] text-white font-bold text-[11px]">
                      <th className="p-2.5 rounded-tl-lg">Setor Econômico</th>
                      <th className="p-2.5 text-center">Empresas</th>
                      <th className="p-2.5 text-center">Jul/24</th>
                      <th className="p-2.5 text-center">Jul/25</th>
                      <th className="p-2.5 text-center">Jul/26</th>
                      <th className="p-2.5 text-center rounded-tr-lg">Var. (24-26)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {sectorData.map((sec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="p-2.5 font-bold text-slate-800">{sec.sector}</td>
                        <td className="p-2.5 text-center text-slate-600">{sec.count}</td>
                        <td className="p-2.5 text-center font-medium text-slate-700">{sec.y24}</td>
                        <td className="p-2.5 text-center font-medium text-slate-700">{sec.y25}</td>
                        <td className="p-2.5 text-center font-bold text-[#0f2942]">{sec.y26}</td>
                        <td className="p-2.5 text-center font-bold">
                          <span
                            className={
                              sec.dif26vs24 > 0
                                ? 'text-emerald-700 font-bold'
                                : sec.dif26vs24 < 0
                                ? 'text-rose-600 font-bold'
                                : 'text-slate-500'
                            }
                          >
                            {sec.dif26vs24 > 0 ? `+${sec.dif26vs24}` : sec.dif26vs24} ({sec.pct26vs24}%)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Highlights & Retractions Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Top Growth */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-emerald-800 bg-emerald-50 p-2 rounded-t-lg border border-emerald-200 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" /> Maiores Expansões (2024-2026)
                  </h4>
                  <div className="border border-t-0 border-slate-200 rounded-b-lg divide-y divide-slate-100 text-xs">
                    {topGrowth.map((g) => (
                      <div key={g.id} className="p-2 flex justify-between items-center">
                        <span className="font-bold text-slate-800 truncate max-w-[170px]" title={g.razaoSocial}>
                          {g.razaoSocial}
                        </span>
                        <span className="font-extrabold text-emerald-700">
                          +{g.dif26vs24} ({g.y2024}➔{g.y2026})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Drops */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-rose-800 bg-rose-50 p-2 rounded-t-lg border border-rose-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Reduções Significativas (2024-2026)
                  </h4>
                  <div className="border border-t-0 border-slate-200 rounded-b-lg divide-y divide-slate-100 text-xs">
                    {topDrops.map((d) => (
                      <div key={d.id} className="p-2 flex justify-between items-center">
                        <span className="font-bold text-slate-800 truncate max-w-[170px]" title={d.razaoSocial}>
                          {d.razaoSocial}
                        </span>
                        <span className="font-extrabold text-rose-600">
                          {d.dif26vs24} ({d.y2024}➔{d.y2026})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="border-t pt-4 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CAMP Santo André • Relatório de Gestão da Aprendizagem</span>
              <span>Página 2 de 4</span>
            </div>
          </div>

          {/* PAGE 3: COMPANY DETAILED TABLE */}
          <div
            id="pdf-page-3"
            className={`pdf-page bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 md:p-12 shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between relative ${
              activePage !== 3 && 'hidden md:flex'
            }`}
            style={{ boxSizing: 'border-box' }}
          >
            <div>
              {/* Mini Header */}
              <div className="border-b pb-3 mb-4 flex justify-between items-center text-xs text-slate-500">
                <span className="font-bold text-[#0f2942]">CAMP Santo André • Quadro Consolidado de Empresas</span>
                <span>Página 3 (Primeiras Empresas)</span>
              </div>

              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0f2942] border-b pb-1 mb-3">
                Extrato das Principais Empresas Ativas
              </h3>

              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="bg-[#0f2942] text-white font-bold">
                    <th className="p-2">Razão Social / Grupo</th>
                    <th className="p-2">Setor</th>
                    <th className="p-2 text-center">2024</th>
                    <th className="p-2 text-center">2025</th>
                    <th className="p-2 text-center">2026</th>
                    <th className="p-2 text-center">Δ Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {consolidatedRecords.slice(0, 22).map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="p-2 font-bold text-slate-900 truncate max-w-[220px]">{r.razaoSocial}</td>
                      <td className="p-2 text-slate-600 text-[10px]">{r.sector}</td>
                      <td className="p-2 text-center text-slate-700">{r.y2024}</td>
                      <td className="p-2 text-center text-slate-700">{r.y2025}</td>
                      <td className="p-2 text-center font-bold text-[#0f2942]">{r.y2026}</td>
                      <td className="p-2 text-center font-bold">
                        <span
                          className={
                            r.dif26vs24 > 0
                              ? 'text-emerald-700'
                              : r.dif26vs24 < 0
                              ? 'text-rose-600'
                              : 'text-slate-500'
                          }
                        >
                          {r.dif26vs24 > 0 ? `+${r.dif26vs24}` : r.dif26vs24}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-slate-400 italic mt-2">
                * Exibindo extrato principal. Consulte o sistema online para navegar pelas 138 empresas consolidadas.
              </p>
            </div>

            {/* Page Footer */}
            <div className="border-t pt-4 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CAMP Santo André • Relatório de Gestão da Aprendizagem</span>
              <span>Página 3 de 4</span>
            </div>
          </div>

          {/* PAGE 4: PARECER DE IA & GOVERNANÇA INSTITUCIONAL */}
          <div
            id="pdf-page-4"
            className={`pdf-page bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-10 md:p-12 shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between relative ${
              activePage !== 4 && 'hidden md:flex'
            }`}
            style={{ boxSizing: 'border-box' }}
          >
            <div>
              {/* Mini Header */}
              <div className="border-b pb-3 mb-6 flex justify-between items-center text-xs text-slate-500">
                <span className="font-bold text-[#0f2942]">CAMP Santo André • Parecer e Diretrizes de Governança</span>
                <span>Emissão Oficial</span>
              </div>

              {/* Strategic Guidelines */}
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                  <h3 className="text-xs font-extrabold text-[#0f2942] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Recomendações de Ação Institucional
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                    <li>
                      <strong>Plano de Recuperação para Reduções Severas:</strong> Agendar reunião prioritária com empresas que reduziram mais de 5 vagas entre 2024 e 2026 para mapear substituições do eSocial.
                    </li>
                    <li>
                      <strong>Apoio Técnico na Formação:</strong> Fortalecer a parceria com a rede formadora do CAMP Santo André oferecendo encaminhamento ágil de novos jovens qualificados.
                    </li>
                    <li>
                      <strong>Reconhecimento de Empresas Cidadãs:</strong> Conceder o Selo Empresa Cidadã às organizações em contínua expansão (ex: Anchieta Peças, CBC, Nilpel, Real Food).
                    </li>
                    <li>
                      <strong>Auditoria e Padronização Cadastral:</strong> Manutenção do cadastro consolidado por CNPJ/Grupo Econômico para evitar divergências em consultas de fiscalização do MTE.
                    </li>
                  </ul>
                </div>

                {/* Institutional Signoff Box */}
                <div className="mt-12 pt-8 border-t-2 border-slate-200 text-center space-y-8">
                  <p className="text-xs text-slate-600 italic">
                    Este relatório foi gerado automaticamente pelo Painel de Aprendizes Ativos do CAMP Santo André com base nos registros oficiais das medições de Julho/2024, Julho/2025 e Julho/2026.
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-6 max-w-lg mx-auto text-xs text-slate-800">
                    <div className="border-t border-slate-400 pt-2">
                      <strong className="block font-bold">CAMP Santo André</strong>
                      <span className="text-[11px] text-slate-500">Departamento de Aprendizagem</span>
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                      <strong className="block font-bold">Coordenação do Programa</strong>
                      <span className="text-[11px] text-slate-500">Supervisão e Relações Corporativas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="border-t pt-4 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CAMP Santo André • Relatório de Gestão da Aprendizagem</span>
              <span>Página 4 de 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
