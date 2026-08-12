import { SummaryMetrics, AIAnalysisResponse } from '../types';

export function generateFallbackAiAnalysis(metrics: SummaryMetrics): AIAnalysisResponse {
  return {
    sinteseExecutiva: `Parecer executivo do quadro de aprendizes ativos no período de 2024 a 2026. Em Julho/2024, a rede contava com ${metrics.total2024} aprendizes ativos, evoluindo para ${metrics.total2025} em 2025 (${metrics.pct25vs24 > 0 ? '+' : ''}${metrics.pct25vs24}%) e fechando em ${metrics.total2026} aprendizes em Julho/2026 (${metrics.pct26vs25 > 0 ? '+' : ''}${metrics.pct26vs25}%). O balanço geral do biênio 2024-2026 apresenta uma oscilação acumulada de ${metrics.dif26vs24} aprendizes (${metrics.pct26vs24}%), demandando estratégias direcionadas de captação e auditoria preventiva da cota legal.`,
    destaquesPositivos: [
      `Manutenção do engajamento de ${metrics.activeCompanies2026} empresas parceiras ativas no quadro de 2026.`,
      `Crescimento contínuo em organizações do setor de Saúde e prestação de serviços essenciais no Grande ABC.`,
      `Oportunidade de unificação e gestão otimizada de grupos econômicos consolidados.`
    ],
    alertasERiscos: [
      `Retração de contratações em redes de grande varejo e redes assistenciais de saúde terceirizadas.`,
      `Empresas que zeraram o quadro de aprendizes em 2026, necessitando de sensibilização imediata.`,
      `Necessidade de acompanhamento próximo ao término dos contratos de aprendizagem.`
    ],
    recomendacoesEstrategicas: [
      `Atuação proativa junto às empresas com queda na cota legal para oferecer novas turmas de aprendizes.`,
      `Implantação do Painel de Monitoramento Contínuo para antecipar desmobilizações de turmas.`,
      `Criação do Programa Empresa Cidadã do CAMP Santo André para valorizar parceiros estratégicos.`,
      `Ações conjuntas de conscientização sobre o impacto social da aprendizagem profissional no município.`
    ]
  };
}
