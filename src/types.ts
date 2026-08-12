export interface ApprenticeRecord {
  id: string;
  razaoSocial: string;
  normalizedName: string;
  sector: string;
  y2024: number;
  y2025: number;
  y2026: number;
  dif25vs24: number;
  dif26vs25: number;
  dif26vs24: number;
  pct25vs24: number;
  pct26vs25: number;
  pct26vs24: number;
  status: 'Alta Expressiva' | 'Crescimento' | 'Estável' | 'Queda' | 'Queda Severa' | 'Zerado';
}

export interface SummaryMetrics {
  total2024: number;
  total2025: number;
  total2026: number;
  dif25vs24: number;
  dif26vs25: number;
  dif26vs24: number;
  pct25vs24: number;
  pct26vs25: number;
  pct26vs24: number;
  activeCompanies2024: number;
  activeCompanies2025: number;
  activeCompanies2026: number;
  totalCompaniesCount: number;
  growingCompanies25vs24: number;
  growingCompanies26vs25: number;
  fallingCompanies25vs24: number;
  fallingCompanies26vs25: number;
  stableCompanies25vs24: number;
  stableCompanies26vs25: number;
}

export interface AIAnalysisResponse {
  sinteseExecutiva: string;
  destaquesPositivos: string[];
  alertasERiscos: string[];
  recomendacoesEstrategicas: string[];
  summary?: string;
  highlights2025?: string[];
  highlights2026?: string[];
  recommendations?: string[];
  criticalRisks?: string[];
}
