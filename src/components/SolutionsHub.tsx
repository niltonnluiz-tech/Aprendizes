import React from 'react';
import { ApprenticeRecord, SummaryMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Simulador2027 } from './Simulador2027';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building2,
  GitMerge,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Award,
} from 'lucide-react';

interface SolutionsHubProps {
  metrics: SummaryMetrics;
  rawRecords: ApprenticeRecord[];
  consolidatedRecords: ApprenticeRecord[];
}

export const SolutionsHub: React.FC<SolutionsHubProps> = ({
  metrics,
  rawRecords,
  consolidatedRecords,
}) => {
  const { theme } = useTheme();
  const isCamp = theme === 'camp';

  // Identify duplicated companies examples
  const duplicatedExamples = [
    {
      group: 'Fundação do ABC (Rede Assistencial de Saúde)',
      variants: [
        'FUNDACAO DO ABC REDE ASSISTENCIAL DA SUPERVISAO TECNICA DE SAUDE',
        'FUNDAÇÃO DO ABC REDE ASSISTÊNCIAL DA SUPERVISAO TÉCNICA DE SAÚDE',
        'FUNDAÇÃO DO ABC REDE ASSISTÊNCIAL DA SUPERVISÃO TÉCNICA DE SAUDE',
        'FUNDAÇÃO DO ABC REDE ASSISTÊNCIAL DA SUPERVISÃO TÉCNICA DE SAÚDE',
      ],
      total2024: 48,
      total2026: 32,
      count: 5,
    },
    {
      group: 'Copafer Comercial Ltda',
      variants: ['COPAFER COMERCIAL LTDA', 'COPAFER COMERCIAL LTDA LOJA 3'],
      total2024: 12,
      total2026: 13,
      count: 2,
    },
    {
      group: 'BMP Utilidades Domésticas S.A.',
      variants: ['BMP UTILIDADES DOMESTICAS S.A', 'BMP UTILIDADES DOMESTICAS S/A'],
      total2024: 23,
      total2026: 17,
      count: 2,
    },
    {
      group: 'Nilpel Indústria e Comércio de Papéis Ltda',
      variants: ['NILPEL INDUSTRIA E COMERCIO DE PAPEIS LTDA', 'NILPEL INDÚSTRIA E COMÉRCIO DE PAPÉIS LTDA'],
      total2024: 0,
      total2026: 11,
      count: 2,
    },
  ];

  const cardBg = isCamp ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-sm';
  const innerBg = isCamp ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800';
  const textPrimary = isCamp ? 'text-[#0f2942]' : 'text-white';
  const textMuted = isCamp ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className="space-y-8">
      {/* Banner 1: Consolidação por Grupo Econômico */}
      <div className={`${cardBg} border rounded-2xl p-6 space-y-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl ${isCamp ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-400'}`}>
              <GitMerge className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${textPrimary}`}>
                Solução 1: Unificação de Cadastros e Grupos Econômicos
              </h3>
              <p className={`text-xs ${textMuted} mt-0.5`}>
                Eliminação de duplicidades por acentuação, grafia e filiais para evitar análises distorcidas
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
            isCamp ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            -14 duplicidades corrigidas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {duplicatedExamples.map((ex, idx) => (
            <div key={idx} className={`${innerBg} border rounded-xl p-4 space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`font-bold text-xs ${textPrimary}`}>{ex.group}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  isCamp ? 'bg-white border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}>
                  {ex.count} linhas unificadas
                </span>
              </div>
              <div className={`text-[11px] ${textMuted} space-y-1`}>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Variações encontradas na planilha:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[10px] font-mono">
                  {ex.variants.map((v, i) => (
                    <li key={i} className="truncate" title={v}>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner 2: 2027 Target Simulator */}
      <Simulador2027 metrics={metrics} />

      {/* Banner 3: Matriz de Retenção e Riscos */}
      <div className={`${cardBg} border rounded-2xl p-6 space-y-6`}>
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-2xl ${isCamp ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${textPrimary}`}>
              Solução 3: Plano Institucional de Retenção e Cota Legal
            </h3>
            <p className={`text-xs ${textMuted}`}>
              Diretrizes estratégicas recomendadas para o CAMP Santo André na negociação com empresas parceiras
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${innerBg} border rounded-xl p-5 space-y-3`}>
            <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>1. Alerta Vermelho (0 Aprendizes)</span>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Empresas que zeraram o quadro em 2026. Ação recomendada: Contato direto do setor corporativo do CAMP Santo André para auditoria de cota.
            </p>
          </div>

          <div className={`${innerBg} border rounded-xl p-5 space-y-3`}>
            <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs">
              <TrendingDown className="w-4 h-4" />
              <span>2. Queda de Quadro (&gt;3 Vagas)</span>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Organizações em redução continuada. Oferecer reuniões diagnósticas e adequação de jornadas de aprendizagem.
            </p>
          </div>

          <div className={`${innerBg} border rounded-xl p-5 space-y-3`}>
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>3. Programa Empresa Cidadã</span>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Reconhecimento oficial e selo de responsabilidade social às empresas com maior crescimento continuado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
