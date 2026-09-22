export interface Opcao {
  id: string;
  nome: string;
  /** Posição vertical da faixa na arte (px da imagem original) */
  y: number;
  /** Altura da faixa na arte (px da imagem original) */
  h: number;
  /** Cor usada nas barras do resultado */
  cor: string;
}

export const CONFIG = {
  pinAdmin: import.meta.env.VITE_PIN_ADMIN ?? '1234',
  tempoObrigadoMs: 3500,
  tempoLimiteConfirmacaoMs: 20000,
  chaveStorage: 'votacao_mascote_v1',
} as const;

/** Dimensões da arte e região horizontal das faixas de opção */
export const IMAGEM = {
  largura: 1024,
  altura: 1536,
  recorteX: 75,
  recorteLargura: 873,
} as const;

export const OPCOES: Opcao[] = [
  { id: 'sr_molar', nome: 'Sr. Molar', y: 400, h: 160, cor: '#5fb8f0' },
  { id: 'dentinho', nome: 'Dentinho', y: 572, h: 160, cor: '#7ccf6a' },
  { id: 'dentao', nome: 'Dentão', y: 742, h: 164, cor: '#f2c14e' },
  { id: 'dede', nome: 'Dedé', y: 916, h: 166, cor: '#f28aa0' },
  { id: 'kiko', nome: 'Kiko', y: 1093, h: 169, cor: '#a58be0' },
];
