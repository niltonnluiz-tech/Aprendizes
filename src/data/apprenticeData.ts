import { ApprenticeRecord, SummaryMetrics } from '../types';

export const RAW_CSV_DATA = `RazaoSocial;Quantidade de aprendizes ativos JULHO/2024;Quantidade de aprendizes ativos JULHO/2025;Quantidade de aprendizes ativos JULHO/2026;Dif_25_vs_24;Dif_26_vs_25
1° OFICIAL DE REGISTRO DE IMÓVEIS, TÍTULOS E DOCUMENTOS E CIVIL DE PESSOA JURÍDICA;1;2;2;1;0
ABC TORIBA VEICULOS LTDA;0;0;0;0;0
ACTIVAS PLÁSTICOS INDUSTRIAIS LTDA;2;3;2;1;-1
ACTIVAS PLÁSTICOS INDUSTRIAIS LTDA.;2;1;1;-1;0
ACTPLUS COMÉRCIO E INDÚSTRIA DE TRANSFORMAÇÃO PLÁSTICA LTDA;0;1;2;1;1
AMEMIYA INDUSTRIA MECANICA LTDA;9;7;9;-2;2
AMTEC USINAGEM LTDA;4;2;3;-2;1
ANCHIETA PECAS DISTRIBUIDORA DE PECAS PARA CAMINHOES E ONIBUS LTDA;3;16;11;13;-5
ARMARINHOS FERNANDO LTDA;127;82;57;-45;-25
ASSOCIACAO ASSISTENCIAL E EDUCACIONAL JARDIM SANTO ANDRE;1;2;2;1;0
ASSOCIACAO EDUCACIONAL PENTAGONO;0;2;3;2;1
AÇOFER INDÚSTRIA E COMÉRCIO DE FERRO LTDA;2;4;4;2;0
BANDEIRANTE QUÍMICA LTDA;2;0;1;-2;1
BDP SOUTH AMERICA LTDA;2;3;2;1;-1
BMP UTILIDADES DOMESTICAS S.A;12;7;5;-5;-2
BMP UTILIDADES DOMESTICAS S/A;11;13;12;2;-1
BRIDGESTONE DO BRASIL INDÚSTRIA E COMÉRCIO LTDA.;61;63;62;2;-1
C & R SANTO ANDRE ROUPAS LTDA;0;0;0;0;0
CABOT BRASIL INDÚSTRIA E COMÉRCIO LTDA;2;2;3;0;1
CBC COMPANHIA BRASILEIRA DE CARTUCHOS;62;62;73;0;11
CENTRO INTEGRADO DE EDUCACAO LTDA;1;2;2;1;0
CERDIA BRASIL INDUSTRIA E COMERCIO LTDA.;0;0;1;0;1
CHEVRON ORONITE BRASIL LTDA.;1;1;1;0;0
CHINA GLASS;0;1;0;1;-1
CIAMON REVESTIMENTOS LTDA;0;0;4;0;4
CIASUL COMERCIAL LTDA;0;0;1;0;1
CIDADE EL SHADAI - EDUCACAO INFANTIL E ENSINO FUNDAMENTAL I LTDA.;0;0;0;0;0
CIDADE EL SHADAI ENSINO MEDIO E TECNICO LTDA.;0;0;1;0;1
COMERCIAL AJA - COMERCIO ATACADISTA DE OVOS LTDA.;0;3;5;3;2
COMERCIAL ANTONIO CARVALHO LTDA;0;0;3;0;3
CONDOMINIO CIVIL MAUÁ PLAZA SHOPPING;2;2;2;0;0
CONDOMINIO ORDINARIO DO SHOPPING LESTE ARINCANDUVA;2;1;1;-1;0
CONSTRUTORA NWP MAGGIORE LTDA;0;0;1;0;1
CONTEMP INDÚSTRIA COMÉRCIO E SERVIÇOS LTDA;2;2;0;0;-2
CONTRACT REVESTIMENTOS PARA CONSTRUCAO LTDA;0;0;2;0;2
COOPERATIVA DE TRANSPORTES DE CARGAS QUIMICAS E CORROSIVAS DE MAUA;0;0;1;0;1
COPAFER COMERCIAL LTDA;0;6;4;6;-2
COPAFER COMERCIAL LTDA LOJA 3;12;9;9;-3;0
COPAM COMPONENTES DE PAPELAO E MADEIRA LTDA;0;0;3;0;3
CROMUS EMBALAGENS INDUSTRIA E COMERCIO LTDA;2;4;3;2;-1
CROMUS EMBALAGENS INDÚSTRIA E COMÉRCIO LTDA;27;21;18;-6;-3
CURADEN SWISS DO BRASIL - IMPORTACAO E EXPORTACAO LTDA.;0;0;2;0;2
DALFERINOX INDUSTRIA E COMERCIO LTDA;0;0;1;0;1
DCTECH SYSTEMS AUTOMACAO INDUSTRIAL LTDA;0;0;1;0;1
DIGUINHO INDÚSTRIA E COMÉRCIO DE FRALDAS LTDA;2;0;4;-2;4
DIMENSIONAL BRASIL SOLUÇÕES LTDA;3;2;1;-1;-1
DOURO TORIBA VEICULOS LTDA;0;0;0;0;0
EA TREINAMENTOS LTDA;0;3;1;3;-2
EAGLETRONICA INDUSTRIA E COMERCIO LTDA;0;1;0;1;-1
ECCO BRAZ CONSTRUCAO E INCORPORACAO DE IMOVEIS LTDA;0;0;1;0;1
EDUCANDARIO SIMAO PEDRO;0;2;1;2;-1
ELETRO FORTE COMERCIAL ELETRICA LTDA.;0;2;2;2;0
ELINOX CENTRAL DE ACO INOXIDAVEL LTDA;8;10;12;2;2
EMBRATECH INDUSTRIA, COMERCIO & MONTAGENS INDUSTRIAIS LTDA.;0;0;2;0;2
ENGEMET METALÚRGIA E COMÉRCIO LTDA;4;3;2;-1;-1
ESCAD RENTAL LOCADORA DE EQUIPAMENTOS PARA TERRAPLANAGEM LTDA;0;0;0;0;0
ESCAD RENTAL LOCADORA DE EQUIPAMENTOS PARA TERRAPLENAGEM SA;1;1;2;0;1
ESPACIAL SUPRIMENTOS DE ESCRITORIO E INFORMATICA LTDA;4;2;7;-2;5
ESTILU CONTABILIDADE LTDA ME;0;0;1;0;1
EUROBRAS CONTRUÇÕES METALICAS MODULADAS LTDA;4;5;4;1;-1
EVERLAB SOLUCOES TECNICAS ANALITICAS LTDA;0;0;1;0;1
EXPEX;1;0;0;-1;0
FECAUTO COMERCIO DE AUTOPECAS LTDA;0;0;1;0;1
FORMTAP INDUSTRIA E COMERCIO S/A;12;10;14;-2;4
FORTE FIXADORES INDUSTRIA METALURGICA LTDA;0;0;2;0;2
FUNDACAO DO ABC  REDE ASSISTENCIAL DA SUPERVISAO TECNICA DE SAUDE;6;6;2;0;-4
FUNDAÇÃO DO ABC  REDE ASSISTÊNCIAL DA SUPERVISAO TÉCNICA DE SAÚDE;1;0;1;-1;1
FUNDAÇÃO DO ABC  REDE ASSISTÊNCIAL DA SUPERVISÃO TÉCNICA DE SAUDE;0;0;0;0;0
FUNDAÇÃO DO ABC  REDE ASSISTÊNCIAL DA SUPERVISÃO TÉCNICA DE SAÚDE;35;27;27;-8;0
FUNDAÇÃO DO ABC REDE ASSISTÊNCIAL DA SUPERVISÃO TÉCNICA DE SAÚDE;6;4;2;-2;-2
GOIANIA MAUÁ CONSTRUTORA LTDA;2;1;1;-1;0
GOLFINHO SERVIÇOS;1;0;0;-1;0
GRUPO ASSISTENCIAL IRMÃO ROMANO;0;1;1;1;0
HERBIO MERCADO, PADARIA E ACOUGUE LTDA;0;0;0;0;0
HM CONSULTORIA EM SAUDE LTDA;0;0;1;0;1
HORTIFRUTI DO BAIRRO LTDA;0;0;0;0;0
IGUAL ASSESSORIA IMOBILIARIA LTDA;0;0;1;0;1
INSTITUICAO ASSISTENCIAL E EDUCACIONAL AMELIA RODRIGUES;0;3;3;3;0
INSTITUIÇÃO ASSISTÊNCIAL LIDIA POLLONE;1;1;2;0;1
JFO SERVIÇOS TERCEIRIZADOS DE APOIO RESIDENCIAL, COMERCIAL E INDUSTRIAL LTDA;0;1;1;1;0
JULIANA SIMOES GOIS;0;0;0;0;0
M DIAS BRANCO S.A. INDUSTRIA E COMERCIO DE ALIMENTOS;18;22;24;4;2
MACAN;1;0;0;-1;0
MAGNETI MARELLI COFAP FABRICADORA DE PECAS LTDA;13;11;10;-2;-1
MARELLI SISTEMAS AUTOMOTIVOS INDUSTRIA E COMERCIO BRASIL LTDA;22;21;21;-1;0
MARIA JOSE VIEIRA SILICONES;0;0;1;0;1
MARTINI ADVOGADOS ASSOCIADOS;0;0;1;0;1
MASTICMOL INDUSTRIA E COMERCIO LTDA.;0;0;4;0;4
MEGAMETAL COMERCIO DE ACOS E METAIS LTDA;0;2;2;2;0
MEIMEI EDUCACAO E ASSISTENCIA;0;1;2;1;1
MICROPARTS PECAS INJETADAS LTDA;0;0;1;0;1
MINIMERCADO TONAKI LTDA;0;1;1;1;0
MITSUI PRIME ADVANCED COMPOSITES DO BRASIL INDÚSTRIA E COMÉRCIO DE COMPOSTOS PLÁSTICOS S/A;3;4;4;1;0
MRS INDUSTRIA E SERVICOS LTDA;0;0;1;0;1
MRS SERVICOS DE ADMINISTRACAO LTDA;0;0;0;0;0
N4 SOLUCOES - INDUSTRIA DE PAPEIS E TRANSPORTES LTDA;0;0;1;0;1
NILPEL INDUSTRIA E COMERCIO DE PAPEIS LTDA;0;0;2;0;2
NILPEL INDÚSTRIA E COMÉRCIO DE PAPÉIS LTDA;0;10;12;10;2
NIVALMIX LOJA DE DEPARTAMENTOS LTDA;0;0;0;0;0
NOVA MIRAGE ARTES GRAFICA LTDA;0;0;1;0;1
ODC CARIJOS SERVICOS ODONTOLOGICOS LTDA;0;0;0;0;0
ODC CENTRO SERVICOS ODONTOLOGICOS LTDA;0;0;1;0;1
ORIENTE TORIBA VEICULOS LTDA;0;0;1;0;1
ORIGINAL INDUSTRIA E COMERCIO DE ESTOFADOS LTDA;0;0;3;0;3
PARANAPANEMA S/A;17;22;18;5;-4
PERALTA AMBIENTAL IMPORTACAO E EXPORTACAO LTDA;0;0;4;0;4
PLASTIFAMA INDUSTRIA E COMERCIO DE EMBALAGENS LTDA;2;2;2;0;0
POLISIL INDUSTRIA E COMERCIO DE SILICONE LTDA.;0;0;1;0;1
POLLONE & ARSUFFI SERVICOS ODONTOLOGICOS LTDA.;0;0;1;0;1
PONTO FORTE CONSTRUÇÕES E EMPREENDIMENTOS LTDA;2;1;0;-1;-1
PP FILME INDUSTRIA E COMERCIO DE PLASTICOS LTDA;0;0;3;0;3
PROPAGANDA EM PLÁSTICOS SUPERDISPLAY LTDA;1;1;1;0;0
QUALITY FIX DO BRASIL, INDÚSTRIA, COMÉRCIO, IMPORTAÇÃO E EXPORTAÇÃO;2;4;3;2;-1
R.TOM RESTAURANTE LTDA;0;0;0;0;0
RADIAL TORIBA VEICULOS LTDA;0;1;2;1;1
RASSINI NHK AUTOPEÇAS LTDA;6;1;1;-5;0
REAL FOOD ALIMENTACAO LTDA;0;3;4;3;1
REAL FOOD ALIMENTAÇÃO LTDA;5;9;8;4;-1
REALTEC ENGENHARIA LTDA;1;1;1;0;0
RECANTO SOMASQUINHO;0;2;2;2;0
RECON ENGENHARIA LTDA;0;0;2;0;2
REDE COMERCIO E DISTRIBUIDORA DE ALIMENTOS E EMBALAGENS LTDA;0;0;1;0;1
REYLE INDUSTRIA E COMERCIO DE CORREIAS LTDA;0;0;1;0;1
RHODIA BRASIL S.A.;0;0;5;0;5
RHODIA BRASIL1;16;14;7;-2;-7
RIO BRANCO COMERCIO E INDUSTRIA DE PAPEIS LTDA;0;2;2;2;0
SAINT GOBAIN DO BRASIL PRODUTOS INDÚSTRIAIS E PARA CONSTRUÇÃO;1;1;0;0;-1
SANDEFER-FERRO E AÇO LTDA;0;3;3;3;0
SETE DIAS SACOLÃO;0;1;0;1;-1
SHOPPING CENTER LESTE COMERCIAL LTDA;1;1;0;0;-1
SINDICATO DO COMÉRCIO VAREJISTA DO ABC;5;1;3;-4;2
SMPV;1;0;0;-1;0
SUPERMERCADO FENICIA LTDA;0;1;3;1;2
SUPERMERCADOS SÃO JUDAS TADEU LTDA;6;5;4;-1;-1
TECHNIC DO BRASIL LTDA;2;0;1;-2;1
TECNOMIDIA COMUNICACAO VISUAL LTDA;0;0;2;0;2
TECNOPRINT AUTOMACAO INDUSTRIAL LTDA;0;0;0;0;0
TENNECO SISTEMAS AUTOMOTIVOS LTDA;10;10;10;0;0
TURY DO BRASIL INDÚSTRIA E COMÉRCIO LTDA;0;4;1;4;-3
UDLOG ARMAZÉNS GERAIS TRANSPORTES E LOGÍSTICA LTDA;1;0;0;-1;0
UNIPAR CARBOCLORO;1;1;0;0;-1
UNIPAR INDUPA DO BRASIL S/A;6;6;2;0;-4
UNOTECH IMPORTAÇÃO E COMÉRCIO LTDA;3;4;4;1;0
VELAS ONLINE DECOR LTDA;0;0;0;0;0
VELOCE LOGISTICA S.A.;0;3;3;3;0
VELOCE LOGÍSTICA S.A;2;1;2;-1;1
VERTAS AMBIENTAL LTDA;0;5;5;5;0
VIDROLANDIA INDUSTRIA E COMERCIO LTDA;0;0;1;0;1
VILA REAL PARTICIPACOES E GESTAO LIMITADA;0;1;2;1;1
VITROCOLOR INDUSTRIA E COMERCIO DE VIDROS LTDA;8;8;6;0;-2
WHITE MARTINS GASES INDUSTRIAIS LTDA;3;3;1;0;-2
WR IMPORTS;1;0;0;-1;0
WUH GROUP;1;0;0;-1;0`;

// Utility to normalize company names and unify duplicate branches/typos
export function normalizeCompanyName(name: string): string {
  const upper = name.toUpperCase().trim();

  if (upper.includes('ACTIVAS PLÁSTICOS') || upper.includes('ACTIVAS PLASTICOS')) {
    return 'Activas Plásticos Industriais Ltda';
  }
  if (upper.includes('BMP UTILIDADES')) {
    return 'BMP Utilidades Domésticas S.A.';
  }
  if (upper.includes('COPAFER')) {
    return 'Copafer Comercial Ltda';
  }
  if (upper.includes('CROMUS EMBALAGENS')) {
    return 'Cromus Embalagens Indústria e Comércio Ltda';
  }
  if (upper.includes('FUNDACAO DO ABC') || upper.includes('FUNDAÇÃO DO ABC')) {
    return 'Fundação do ABC (Rede Assistencial de Saúde)';
  }
  if (upper.includes('NILPEL')) {
    return 'Nilpel Indústria e Comércio de Papéis Ltda';
  }
  if (upper.includes('REAL FOOD')) {
    return 'Real Food Alimentação Ltda';
  }
  if (upper.includes('RHODIA BRASIL')) {
    return 'Rhodia Brasil S.A.';
  }
  if (upper.includes('VELOCE LOGISTICA') || upper.includes('VELOCE LOGÍSTICA')) {
    return 'Veloce Logística S.A.';
  }
  if (upper.includes('ESCAD RENTAL')) {
    return 'Escad Rental Locadora de Equipamentos S.A.';
  }
  if (upper.includes('TORIBA VEICULOS') || upper.includes('TORIBA VEÍCULOS')) {
    if (upper.includes('ABC TORIBA')) return 'Toriba Veículos (Unidade ABC)';
    if (upper.includes('DOURO TORIBA')) return 'Toriba Veículos (Unidade Douro)';
    if (upper.includes('ORIENTE TORIBA')) return 'Toriba Veículos (Unidade Oriente)';
    if (upper.includes('RADIAL TORIBA')) return 'Toriba Veículos (Unidade Radial)';
    return 'Toriba Veículos Group';
  }
  if (upper.includes('UNIPAR')) {
    if (upper.includes('CARBOCLORO')) return 'Unipar Carbocloro';
    if (upper.includes('INDUPA')) return 'Unipar Indupa do Brasil S.A.';
    return 'Unipar S.A.';
  }
  
  // Format neat title case for other names
  return name
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    .replace(/\bLtda\b/gi, 'Ltda')
    .replace(/\bSa\b/gi, 'S.A.')
    .replace(/\bS\/a\b/gi, 'S.A.')
    .replace(/\bMe\b/gi, 'ME');
}

// Categorize companies by sector heuristically
export function detectSector(name: string): string {
  const upper = name.toUpperCase();
  if (upper.includes('SAUDE') || upper.includes('SAÚDE') || upper.includes('HOSPITAL') || upper.includes('FUNDAÇÃO DO ABC') || upper.includes('FUNDACAO DO ABC') || upper.includes('ODONTO') || upper.includes('ODC ')) {
    return 'Saúde & Assistência';
  }
  if (upper.includes('EDUCACAO') || upper.includes('EDUCAÇÃO') || upper.includes('ENSINO') || upper.includes('ESCOLA') || upper.includes('EDUCANDARIO') || upper.includes('PENTAGONO') || upper.includes('AMELIA RODRIGUES') || upper.includes('MEIMEI')) {
    return 'Educação & Formação';
  }
  if (upper.includes('MECANICA') || upper.includes('USINAGEM') || upper.includes('METAL') || upper.includes('FERRO') || upper.includes('AÇO') || upper.includes('ACO') || upper.includes('CARTUCHOS') || upper.includes('AUTOPEÇAS') || upper.includes('AUTOPECAS') || upper.includes('MARELLI') || upper.includes('TENNECO') || upper.includes('ENGEMET') || upper.includes('DALFERINOX') || upper.includes('RASSINI')) {
    return 'Indústria Metalmecânica & Auto';
  }
  if (upper.includes('QUÍMICA') || upper.includes('QUIMICA') || upper.includes('PLÁSTICO') || upper.includes('PLASTICO') || upper.includes('SILICONE') || upper.includes('RHODIA') || upper.includes('UNIPAR') || upper.includes('BRIDGESTONE') || upper.includes('CABOT') || upper.includes('ACTIVAS') || upper.includes('CHEVRON')) {
    return 'Química, Plásticos & Borracha';
  }
  if (upper.includes('SUPERMERCADO') || upper.includes('ARMARINHOS') || upper.includes('SHOPPING') || upper.includes('LOJA') || upper.includes('COMERCIAL') || upper.includes('COMERCIO') || upper.includes('DISTRIBUIDORA') || upper.includes('ALIMENTOS') || upper.includes('SACOLÃO') || upper.includes('NIVALMIX') || upper.includes('BMP')) {
    return 'Comércio & Varejo';
  }
  if (upper.includes('LOGISTICA') || upper.includes('LOGÍSTICA') || upper.includes('TRANSPORTES') || upper.includes('ARMAZÉNS') || upper.includes('UDLOG') || upper.includes('VELOCE') || upper.includes('BDP')) {
    return 'Logística & Transportes';
  }
  if (upper.includes('PAPEL') || upper.includes('PAPÉIS') || upper.includes('PAPEIS') || upper.includes('EMBALAGENS') || upper.includes('CROMUS') || upper.includes('NILPEL') || upper.includes('COPAM')) {
    return 'Papel, Celulose & Embalagens';
  }
  if (upper.includes('CONSTRUTORA') || upper.includes('ENGENHARIA') || upper.includes('CONSTRUÇÃO') || upper.includes('CONSTRUCAO') || upper.includes('IMÓVEIS') || upper.includes('IMOVEIS') || upper.includes('REVESTIMENTOS')) {
    return 'Construção & Imobiliário';
  }
  return 'Serviços & Outros';
}

function calculateStatus(pct26vs24: number, dif26vs24: number, total2026: number): ApprenticeRecord['status'] {
  if (total2026 === 0) return 'Zerado';
  if (dif26vs24 >= 5 || pct26vs24 >= 50) return 'Alta Expressiva';
  if (dif26vs24 > 0) return 'Crescimento';
  if (dif26vs24 === 0) return 'Estável';
  if (dif26vs24 > -5) return 'Queda';
  return 'Queda Severa';
}

export function parseRawCsvData(): ApprenticeRecord[] {
  const lines = RAW_CSV_DATA.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const header = lines[0]; // skip header
  const records: ApprenticeRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(';');
    if (parts.length < 6) continue;

    const razaoSocial = parts[0].trim();
    const y2024 = parseInt(parts[1], 10) || 0;
    const y2025 = parseInt(parts[2], 10) || 0;
    const y2026 = parseInt(parts[3], 10) || 0;
    const dif25vs24 = parseInt(parts[4], 10) || (y2025 - y2024);
    const dif26vs25 = parseInt(parts[5], 10) || (y2026 - y2025);
    const dif26vs24 = y2026 - y2024;

    const pct25vs24 = y2024 > 0 ? ((y2025 - y2024) / y2024) * 100 : y2025 > 0 ? 100 : 0;
    const pct26vs25 = y2025 > 0 ? ((y2026 - y2025) / y2025) * 100 : y2026 > 0 ? 100 : 0;
    const pct26vs24 = y2024 > 0 ? ((y2026 - y2024) / y2024) * 100 : y2026 > 0 ? 100 : 0;

    records.push({
      id: `emp-${i}`,
      razaoSocial,
      normalizedName: normalizeCompanyName(razaoSocial),
      sector: detectSector(razaoSocial),
      y2024,
      y2025,
      y2026,
      dif25vs24,
      dif26vs25,
      dif26vs24,
      pct25vs24: Math.round(pct25vs24 * 10) / 10,
      pct26vs25: Math.round(pct26vs25 * 10) / 10,
      pct26vs24: Math.round(pct26vs24 * 10) / 10,
      status: calculateStatus(pct26vs24, dif26vs24, y2026),
    });
  }

  return records;
}

export function getConsolidatedRecords(rawRecords: ApprenticeRecord[]): ApprenticeRecord[] {
  const map = new Map<string, {
    razaoSocial: string;
    normalizedName: string;
    sector: string;
    y2024: number;
    y2025: number;
    y2026: number;
    subCompaniesCount: number;
  }>();

  for (const r of rawRecords) {
    const key = r.normalizedName;
    const existing = map.get(key);
    if (existing) {
      existing.y2024 += r.y2024;
      existing.y2025 += r.y2025;
      existing.y2026 += r.y2026;
      existing.subCompaniesCount += 1;
    } else {
      map.set(key, {
        razaoSocial: key,
        normalizedName: key,
        sector: r.sector,
        y2024: r.y2024,
        y2025: r.y2025,
        y2026: r.y2026,
        subCompaniesCount: 1,
      });
    }
  }

  const consolidated: ApprenticeRecord[] = [];
  let idx = 1;
  map.forEach((val, key) => {
    const dif25vs24 = val.y2025 - val.y2024;
    const dif26vs25 = val.y2026 - val.y2025;
    const dif26vs24 = val.y2026 - val.y2024;

    const pct25vs24 = val.y2024 > 0 ? (dif25vs24 / val.y2024) * 100 : val.y2025 > 0 ? 100 : 0;
    const pct26vs25 = val.y2025 > 0 ? (dif26vs25 / val.y2025) * 100 : val.y2026 > 0 ? 100 : 0;
    const pct26vs24 = val.y2024 > 0 ? (dif26vs24 / val.y2024) * 100 : val.y2026 > 0 ? 100 : 0;

    consolidated.push({
      id: `cons-${idx++}`,
      razaoSocial: val.subCompaniesCount > 1 ? `${val.normalizedName} (${val.subCompaniesCount} unidades/filiais)` : val.normalizedName,
      normalizedName: val.normalizedName,
      sector: val.sector,
      y2024: val.y2024,
      y2025: val.y2025,
      y2026: val.y2026,
      dif25vs24,
      dif26vs25,
      dif26vs24,
      pct25vs24: Math.round(pct25vs24 * 10) / 10,
      pct26vs25: Math.round(pct26vs25 * 10) / 10,
      pct26vs24: Math.round(pct26vs24 * 10) / 10,
      status: calculateStatus(pct26vs24, dif26vs24, val.y2026),
    });
  });

  return consolidated;
}

export function computeMetrics(records: ApprenticeRecord[]): SummaryMetrics {
  let total2024 = 0;
  let total2025 = 0;
  let total2026 = 0;
  let activeCompanies2024 = 0;
  let activeCompanies2025 = 0;
  let activeCompanies2026 = 0;

  let growingCompanies25vs24 = 0;
  let growingCompanies26vs25 = 0;
  let fallingCompanies25vs24 = 0;
  let fallingCompanies26vs25 = 0;
  let stableCompanies25vs24 = 0;
  let stableCompanies26vs25 = 0;

  for (const r of records) {
    total2024 += r.y2024;
    total2025 += r.y2025;
    total2026 += r.y2026;

    if (r.y2024 > 0) activeCompanies2024++;
    if (r.y2025 > 0) activeCompanies2025++;
    if (r.y2026 > 0) activeCompanies2026++;

    if (r.dif25vs24 > 0) growingCompanies25vs24++;
    else if (r.dif25vs24 < 0) fallingCompanies25vs24++;
    else stableCompanies25vs24++;

    if (r.dif26vs25 > 0) growingCompanies26vs25++;
    else if (r.dif26vs25 < 0) fallingCompanies26vs25++;
    else stableCompanies26vs25++;
  }

  const dif25vs24 = total2025 - total2024;
  const dif26vs25 = total2026 - total2025;
  const dif26vs24 = total2026 - total2024;

  const pct25vs24 = total2024 > 0 ? (dif25vs24 / total2024) * 100 : 0;
  const pct26vs25 = total2025 > 0 ? (dif26vs25 / total2025) * 100 : 0;
  const pct26vs24 = total2024 > 0 ? (dif26vs24 / total2024) * 100 : 0;

  return {
    total2024,
    total2025,
    total2026,
    dif25vs24,
    dif26vs25,
    dif26vs24,
    pct25vs24: Math.round(pct25vs24 * 10) / 10,
    pct26vs25: Math.round(pct26vs25 * 10) / 10,
    pct26vs24: Math.round(pct26vs24 * 10) / 10,
    activeCompanies2024,
    activeCompanies2025,
    activeCompanies2026,
    totalCompaniesCount: records.length,
    growingCompanies25vs24,
    growingCompanies26vs25,
    fallingCompanies25vs24,
    fallingCompanies26vs25,
    stableCompanies25vs24,
    stableCompanies26vs25,
  };
}
