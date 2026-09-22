import type { Opcao } from '../config/votacao';
import type { Voto } from '../types';

export interface ItemRanking {
  opcao: Opcao;
  votos: number;
  percentual: number;
}

export interface Apuracao {
  total: number;
  ranking: ItemRanking[];
  /** Opções com mais votos (mais de uma = empate). Vazio se não houver votos. */
  lideres: Opcao[];
}

export function contar(votos: Voto[], opcoes: Opcao[]): Record<string, number> {
  const contagem = Object.fromEntries(opcoes.map((o) => [o.id, 0]));
  for (const v of votos) if (v.id in contagem) contagem[v.id]++;
  return contagem;
}

export function apurar(votos: Voto[], opcoes: Opcao[]): Apuracao {
  const contagem = contar(votos, opcoes);
  const total = Object.values(contagem).reduce((a, b) => a + b, 0);

  const ranking = opcoes
    .map((opcao) => ({
      opcao,
      votos: contagem[opcao.id],
      percentual: total ? (contagem[opcao.id] / total) * 100 : 0,
    }))
    .sort((a, b) => b.votos - a.votos);

  const maximo = ranking[0]?.votos ?? 0;
  const lideres = maximo > 0 ? ranking.filter((r) => r.votos === maximo).map((r) => r.opcao) : [];

  return { total, ranking, lideres };
}
