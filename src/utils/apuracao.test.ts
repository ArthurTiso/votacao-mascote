import { describe, expect, it } from 'vitest';
import { apurar, contar } from './apuracao';
import type { Opcao } from '../config/votacao';

const opcoes: Opcao[] = [
  { id: 'a', nome: 'A', y: 0, h: 0, cor: '#000' },
  { id: 'b', nome: 'B', y: 0, h: 0, cor: '#000' },
  { id: 'c', nome: 'C', y: 0, h: 0, cor: '#000' },
];
const voto = (id: string) => ({ id, quando: '2026-01-01T00:00:00.000Z' });

describe('contar', () => {
  it('conta votos por opção e ignora ids desconhecidos', () => {
    expect(contar([voto('a'), voto('a'), voto('x')], opcoes)).toEqual({ a: 2, b: 0, c: 0 });
  });
});

describe('apurar', () => {
  it('sem votos: total zero e sem líderes', () => {
    const r = apurar([], opcoes);
    expect(r.total).toBe(0);
    expect(r.lideres).toEqual([]);
    expect(r.ranking.every((i) => i.percentual === 0)).toBe(true);
  });

  it('identifica vencedor único e ordena o ranking', () => {
    const r = apurar([voto('b'), voto('b'), voto('a')], opcoes);
    expect(r.lideres.map((o) => o.id)).toEqual(['b']);
    expect(r.ranking.map((i) => i.opcao.id)).toEqual(['b', 'a', 'c']);
    expect(r.ranking[0].percentual).toBeCloseTo(66.67, 1);
  });

  it('identifica empate', () => {
    const r = apurar([voto('a'), voto('c')], opcoes);
    expect(r.lideres.map((o) => o.id).sort()).toEqual(['a', 'c']);
  });
});
