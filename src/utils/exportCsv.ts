import { ApprenticeRecord } from '../types';

export function exportToCsv(records: ApprenticeRecord[], filename: string = 'aprendizes_ativos_2024_2026.csv') {
  const headers = [
    'Razão Social',
    'Nome Padronizado / Grupo',
    'Setor Econômico',
    'Julho / 2024',
    'Julho / 2025',
    'Julho / 2026',
    'Diferença (2025 vs 2024)',
    'Diferença (2026 vs 2025)',
    'Balanço Total (2026 vs 2024)',
    '% Variação (2026 vs 2024)',
    'Status',
  ];

  const rows = records.map((r) => [
    `"${r.razaoSocial.replace(/"/g, '""')}"`,
    `"${r.normalizedName.replace(/"/g, '""')}"`,
    `"${r.sector.replace(/"/g, '""')}"`,
    r.y2024,
    r.y2025,
    r.y2026,
    r.dif25vs24,
    r.dif26vs25,
    r.dif26vs24,
    `"${r.pct26vs24}%"`,
    `"${r.status}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
