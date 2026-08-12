import React, { useState } from 'react';
import { ApprenticeRecord, SummaryMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Filter,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface ChartsSectionProps {
  records: ApprenticeRecord[];
  metrics: SummaryMetrics;
  onSelectCompany: (record: ApprenticeRecord) => void;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  records,
  metrics,
  onSelectCompany,
}) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const [topChartFilter, setTopChartFilter] = useState<'growth' | 'drops' | 'volume'>('growth');

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';
  const gridStroke = isCamp ? '#e2e8f0' : '#334155';
  const axisStroke = isCamp ? '#475569' : '#94a3b8';
  const tooltipBg = isCamp ? '#ffffff' : '#0f172a';
  const tooltipBorder = isCamp ? '#cbd5e1' : '#334155';
  const tooltipText = isCamp ? '#0f2942' : '#f8fafc';

  // Overall Progression Data for Area Chart
  const overallProgressionData = [
    { year: '2024 (Jul)', total: metrics.total2024, ativas: metrics.activeCompanies2024 },
    { year: '2025 (Jul)', total: metrics.total2025, ativas: metrics.activeCompanies2025 },
    { year: '2026 (Jul)', total: metrics.total2026, ativas: metrics.activeCompanies2026 },
  ];

  // Sector Aggregation Data
  const sectorMap = new Map<string, { y2024: number; y2025: number; y2026: number; count: number }>();
  records.forEach((r) => {
    const s = r.sector || 'Outros';
    const curr = sectorMap.get(s) || { y2024: 0, y2025: 0, y2026: 0, count: 0 };
    curr.y2024 += r.y2024;
    curr.y2025 += r.y2025;
    curr.y2026 += r.y2026;
    curr.count += 1;
    sectorMap.set(s, curr);
  });

  const sectorChartData = Array.from(sectorMap.entries()).map(([sector, val]) => ({
    sector: sector.length > 22 ? sector.substring(0, 20) + '...' : sector,
    fullSectorName: sector,
    '2024': val.y2024,
    '2025': val.y2025,
    '2026': val.y2026,
    dif: val.y2026 - val.y2024,
  })).sort((a, b) => b['2026'] - a['2026']);

  // Top Movers
  const topGrowthCompanies = [...records]
    .filter((r) => r.dif26vs24 > 0)
    .sort((a, b) => b.dif26vs24 - a.dif26vs24)
    .slice(0, 8)
    .map((r) => ({
      name: r.razaoSocial.length > 22 ? r.razaoSocial.substring(0, 20) + '...' : r.razaoSocial,
      fullName: r.razaoSocial,
      '2024': r.y2024,
      '2025': r.y2025,
      '2026': r.y2026,
      dif: r.dif26vs24,
      record: r,
    }));

  const topDropCompanies = [...records]
    .filter((r) => r.dif26vs24 < 0)
    .sort((a, b) => a.dif26vs24 - b.dif26vs24)
    .slice(0, 8)
    .map((r) => ({
      name: r.razaoSocial.length > 22 ? r.razaoSocial.substring(0, 20) + '...' : r.razaoSocial,
      fullName: r.razaoSocial,
      '2024': r.y2024,
      '2025': r.y2025,
      '2026': r.y2026,
      dif: r.dif26vs24,
      record: r,
    }));

  const topVolumeCompanies = [...records]
    .sort((a, b) => b.y2026 - a.y2026)
    .slice(0, 8)
    .map((r) => ({
      name: r.razaoSocial.length > 22 ? r.razaoSocial.substring(0, 20) + '...' : r.razaoSocial,
      fullName: r.razaoSocial,
      '2024': r.y2024,
      '2025': r.y2025,
      '2026': r.y2026,
      dif: r.dif26vs24,
      record: r,
    }));

  const activeTopData =
    topChartFilter === 'growth'
      ? topGrowthCompanies
      : topChartFilter === 'drops'
      ? topDropCompanies
      : topVolumeCompanies;

  // Status distribution for period comparison
  const statusDistributionData = [
    {
      periodo: '2025 vs 2024',
      Aumentaram: metrics.growingCompanies25vs24,
      Estáveis: metrics.stableCompanies25vs24,
      Reduziram: metrics.fallingCompanies25vs24,
    },
    {
      periodo: '2026 vs 2025',
      Aumentaram: metrics.growingCompanies26vs25,
      Estáveis: metrics.stableCompanies26vs25,
      Reduziram: metrics.fallingCompanies26vs25,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Row 1: Overall Evolution & Status Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Total Apprentice Evolution */}
        <div className={`lg:col-span-7 ${cardBg} border rounded-2xl p-5 shadow-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${isCamp ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-500/10 text-blue-400'}`}>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${textPrimary}`}>
                    Evolução Total de Aprendizes Ativos
                  </h3>
                  <p className={`text-xs ${textMuted}`}>
                    Trajetória agregada do programa nos meses de Julho (2024 a 2026)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs ${textMuted} block`}>Balanço Acumulado</span>
                <span className={`text-sm font-bold ${metrics.dif26vs24 >= 0 ? isCamp ? 'text-emerald-700' : 'text-emerald-400' : isCamp ? 'text-rose-600' : 'text-rose-400'}`}>
                  {metrics.dif26vs24 > 0 ? `+${metrics.dif26vs24}` : metrics.dif26vs24} ({metrics.pct26vs24}%)
                </span>
              </div>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overallProgressionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isCamp ? '#059669' : '#3b82f6'} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={isCamp ? '#059669' : '#3b82f6'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.5} />
                  <XAxis dataKey="year" stroke={axisStroke} fontSize={12} tickLine={false} />
                  <YAxis stroke={axisStroke} fontSize={12} tickLine={false} domain={['dataMin - 30', 'dataMax + 20']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: '12px',
                      color: tooltipText,
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} aprendizes`, 'Total Geral']}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke={isCamp ? '#059669' : '#3b82f6'}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#totalGradient)"
                    dot={{ r: 6, fill: isCamp ? '#059669' : '#3b82f6', stroke: isCamp ? '#ffffff' : '#1e293b', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: isCamp ? '#10b981' : '#60a5fa' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${isCamp ? 'border-slate-200' : 'border-slate-800'} text-xs ${textMuted} flex flex-wrap justify-between items-center gap-2`}>
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isCamp ? 'bg-emerald-600' : 'bg-blue-500'}`}></span>
              2024: <strong>{metrics.total2024}</strong> ➔ 2025: <strong>{metrics.total2025}</strong> ➔ 2026: <strong>{metrics.total2026}</strong>
            </span>
            <span className={isCamp ? 'text-emerald-800 font-medium' : 'text-slate-300'}>
              Amostra: {metrics.totalCompaniesCount} empresas
            </span>
          </div>
        </div>

        {/* Chart 2: Company Status Dynamics */}
        <div className={`lg:col-span-5 ${cardBg} border rounded-2xl p-5 shadow-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`p-2 rounded-lg ${isCamp ? 'bg-blue-50 text-blue-700' : 'bg-indigo-500/10 text-indigo-400'}`}>
                <PieIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold ${textPrimary}`}>
                  Comportamento das Empresas por Período
                </h3>
                <p className={`text-xs ${textMuted}`}>
                  Contagem de empresas que aumentaram, mantiveram ou reduziram
                </p>
              </div>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.5} />
                  <XAxis dataKey="periodo" stroke={axisStroke} fontSize={12} tickLine={false} />
                  <YAxis stroke={axisStroke} fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: '12px',
                      color: tooltipText,
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Aumentaram" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Estáveis" fill="#64748b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Reduziram" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${isCamp ? 'border-slate-200' : 'border-slate-800'} text-xs ${textMuted} flex items-center justify-between`}>
            <span>Destaque 2026:</span>
            <span className="font-semibold text-emerald-600">
              {metrics.growingCompanies26vs25} subiram / {metrics.fallingCompanies26vs25} reduziram
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Top Movers & Sector Evolution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 3: Top Movers Filterable Chart */}
        <div className={`lg:col-span-6 ${cardBg} border rounded-2xl p-5 shadow-sm space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${isCamp ? 'bg-orange-50 text-orange-700' : 'bg-purple-500/10 text-purple-400'}`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-bold ${textPrimary}`}>
                  Destaques por Empresa (2024 vs 2026)
                </h3>
                <p className={`text-xs ${textMuted}`}>
                  Clique em qualquer barra para abrir a ficha completa da empresa
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className={`p-1 rounded-xl border text-[11px] flex items-center ${isCamp ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <button
                onClick={() => setTopChartFilter('growth')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  topChartFilter === 'growth'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isCamp ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                + Crescimento
              </button>
              <button
                onClick={() => setTopChartFilter('drops')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  topChartFilter === 'drops'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : isCamp ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                - Redução
              </button>
              <button
                onClick={() => setTopChartFilter('volume')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  topChartFilter === 'volume'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isCamp ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                Maior Volume
              </button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeTopData}
                margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
                onClick={(state: any) => {
                  if (state && state.activePayload && state.activePayload.length > 0) {
                    const rec = state.activePayload[0].payload.record;
                    if (rec) onSelectCompany(rec);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.5} />
                <XAxis
                  dataKey="name"
                  stroke={axisStroke}
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis stroke={axisStroke} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    color: tooltipText,
                    fontSize: '12px',
                  }}
                  labelFormatter={(label: any, payload: any) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.fullName;
                    }
                    return label;
                  }}
                  formatter={(value: any, name: any) => [`${value} aprendizes`, `Ano ${name}`]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="2024" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="2025" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="2026" fill={topChartFilter === 'drops' ? '#f43f5e' : '#10b981'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Sector Progression Breakdown */}
        <div className={`lg:col-span-6 ${cardBg} border rounded-2xl p-5 shadow-sm space-y-4`}>
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${isCamp ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${textPrimary}`}>
                Aprendizes Ativos por Setor Econômico (2024 vs 2026)
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Comparação do contingente total de aprendizes agrupados por segmento
              </p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData} margin={{ top: 20, right: 20, left: 10, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.5} />
                <XAxis
                  dataKey="sector"
                  stroke={axisStroke}
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis stroke={axisStroke} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    color: tooltipText,
                    fontSize: '12px',
                  }}
                  labelFormatter={(label: any, payload: any) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.fullSectorName;
                    }
                    return label;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="2024" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="2025" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="2026" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
