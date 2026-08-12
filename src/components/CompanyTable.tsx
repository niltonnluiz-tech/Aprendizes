import React, { useState, useMemo } from 'react';
import { ApprenticeRecord } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

interface CompanyTableProps {
  records: ApprenticeRecord[];
  isConsolidated: boolean;
  onSelectCompany: (record: ApprenticeRecord) => void;
}

type SortField = 'razaoSocial' | 'sector' | 'y2024' | 'y2025' | 'y2026' | 'dif25vs24' | 'dif26vs25' | 'dif26vs24' | 'pct26vs24';

export const CompanyTable: React.FC<CompanyTableProps> = ({
  records,
  isConsolidated,
  onSelectCompany,
}) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [sortField, setSortField] = useState<SortField>('y2026');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 15;

  // Extract sectors list
  const sectors = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => set.add(r.sector));
    return Array.from(set).sort();
  }, [records]);

  // Filter & Sort
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.razaoSocial.toLowerCase().includes(search.toLowerCase()) ||
        r.normalizedName.toLowerCase().includes(search.toLowerCase());

      const matchSector = selectedSector === 'todos' || r.sector === selectedSector;

      let matchStatus = true;
      if (selectedStatus === 'crescimento') {
        matchStatus = r.dif26vs24 > 0;
      } else if (selectedStatus === 'queda') {
        matchStatus = r.dif26vs24 < 0;
      } else if (selectedStatus === 'estavel') {
        matchStatus = r.dif26vs24 === 0;
      } else if (selectedStatus === 'sem_aprendizes') {
        matchStatus = r.y2026 === 0;
      }

      return matchSearch && matchSector && matchStatus;
    });
  }, [records, search, selectedSector, selectedStatus]);

  // Sorted Array
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortField, sortAsc]);

  // Paginated
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, page, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
    setPage(1);
  };

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const inputBg = isCamp ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-slate-950 border-slate-800 text-white placeholder-slate-500';
  const tableHeaderBg = isCamp ? 'bg-[#0f2942] text-white' : 'bg-slate-950 text-slate-300';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className={`${cardBg} border rounded-2xl overflow-hidden shadow-sm`}>
      {/* Header Controls Bar */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${isCamp ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-500/10 text-indigo-400'}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${textPrimary} flex items-center gap-2`}>
                Tabela Interativa de Empresas
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  isCamp ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  {sortedRecords.length} encontradas
                </span>
              </h3>
              <p className={`text-xs ${textMuted}`}>
                {isConsolidated
                  ? 'Exibindo dados consolidados por razão social / grupo econômico'
                  : 'Exibindo registros originais do relatório preliminar'}
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
            <input
              type="text"
              placeholder="Buscar por razão social..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isCamp ? 'focus:ring-emerald-500' : 'focus:ring-blue-500'
              } ${inputBg}`}
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* Sector Select */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold ${textMuted} shrink-0`}>Setor:</span>
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setPage(1);
              }}
              className={`w-full py-2 px-3 text-xs rounded-xl border focus:outline-none ${inputBg}`}
            >
              <option value="todos">Todos os Setores ({sectors.length})</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Status Select */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold ${textMuted} shrink-0`}>Tendência (24-26):</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className={`w-full py-2 px-3 text-xs rounded-xl border focus:outline-none ${inputBg}`}
            >
              <option value="todos">Todos os Status</option>
              <option value="crescimento">📈 Crescimento (+ aprendizes)</option>
              <option value="queda">📉 Redução (- aprendizes)</option>
              <option value="estavel">➡️ Quadro Estável (0 variação)</option>
              <option value="sem_aprendizes">⚠️ Sem aprendizes em 2026</option>
            </select>
          </div>

          {/* Quick Clear */}
          {(search || selectedSector !== 'todos' || selectedStatus !== 'todos') && (
            <div className="flex items-center">
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedSector('todos');
                  setSelectedStatus('todos');
                  setPage(1);
                }}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-3 py-1.5 underline"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`font-bold uppercase tracking-wider text-[11px] ${tableHeaderBg}`}>
              <th
                onClick={() => handleSort('razaoSocial')}
                className="p-3.5 cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Razão Social</span>
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort('sector')}
                className="p-3.5 cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Setor</span>
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort('y2024')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Jul/2024
              </th>

              <th
                onClick={() => handleSort('y2025')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Jul/2025
              </th>

              <th
                onClick={() => handleSort('y2026')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Jul/2026
              </th>

              <th
                onClick={() => handleSort('dif25vs24')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Δ 25 vs 24
              </th>

              <th
                onClick={() => handleSort('dif26vs25')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Δ 26 vs 25
              </th>

              <th
                onClick={() => handleSort('dif26vs24')}
                className="p-3.5 text-center cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                Δ Total (24-26)
              </th>

              <th className="p-3.5 text-center">Ações</th>
            </tr>
          </thead>

          <tbody className={`divide-y ${isCamp ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-500 text-xs">
                  Nenhuma empresa encontrada com os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r, idx) => {
                const isZero26 = r.y2026 === 0;
                const isGrowth = r.dif26vs24 > 0;
                const isDrop = r.dif26vs24 < 0;

                return (
                  <tr
                    key={r.id}
                    className={`transition-colors ${
                      isCamp
                        ? idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                        : idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/80'
                    } ${isCamp ? 'hover:bg-blue-50/50' : 'hover:bg-slate-800/50'}`}
                  >
                    {/* Company Name */}
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        <span className="truncate max-w-[240px]" title={r.razaoSocial}>
                          {r.razaoSocial}
                        </span>
                        {r.hasBranchNotice && (
                          <span
                            className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20"
                            title="Filiais consolidadas sob o mesmo grupo"
                          >
                            Filiais
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Sector */}
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 text-xs">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        isCamp ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}>
                        {r.sector}
                      </span>
                    </td>

                    {/* 2024 */}
                    <td className="p-3.5 text-center font-medium text-slate-700 dark:text-slate-300">
                      {r.y2024}
                    </td>

                    {/* 2025 */}
                    <td className="p-3.5 text-center font-medium text-slate-700 dark:text-slate-300">
                      {r.y2025}
                    </td>

                    {/* 2026 */}
                    <td className={`p-3.5 text-center font-extrabold ${
                      isZero26 ? 'text-rose-600 font-bold' : isCamp ? 'text-[#0f2942]' : 'text-white'
                    }`}>
                      {r.y2026}
                    </td>

                    {/* Δ 25 vs 24 */}
                    <td className="p-3.5 text-center font-semibold">
                      <span className={r.dif25vs24 > 0 ? 'text-emerald-600 font-bold' : r.dif25vs24 < 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                        {r.dif25vs24 > 0 ? `+${r.dif25vs24}` : r.dif25vs24}
                      </span>
                    </td>

                    {/* Δ 26 vs 25 */}
                    <td className="p-3.5 text-center font-semibold">
                      <span className={r.dif26vs25 > 0 ? 'text-emerald-600 font-bold' : r.dif26vs25 < 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                        {r.dif26vs25 > 0 ? `+${r.dif26vs25}` : r.dif26vs25}
                      </span>
                    </td>

                    {/* Δ Total (24-26) */}
                    <td className="p-3.5 text-center font-extrabold">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                        isGrowth
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : isDrop
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                      }`}>
                        {r.dif26vs24 > 0 ? `+${r.dif26vs24}` : r.dif26vs24} ({r.pct26vs24}%)
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => onSelectCompany(r)}
                        className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 mx-auto ${
                          isCamp
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 border border-slate-700'
                        }`}
                        title="Abrir ficha detalhada"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detalhes</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        isCamp ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-400'
      }`}>
        <div>
          Exibindo <strong>{(page - 1) * pageSize + 1}</strong> a{' '}
          <strong>{Math.min(page * pageSize, sortedRecords.length)}</strong> de{' '}
          <strong>{sortedRecords.length}</strong> empresas
        </div>

        {/* Page Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`p-1.5 rounded-lg border disabled:opacity-40 transition-colors ${
              isCamp ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-semibold px-2">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`p-1.5 rounded-lg border disabled:opacity-40 transition-colors ${
              isCamp ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
