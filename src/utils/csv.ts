import type { Opcao } from '../config/votacao';
import type { Voto } from '../types';
import { contar } from './apuracao';

export function gerarCsv(votos: Voto[], opcoes: Opcao[]): string {
  const contagem = contar(votos, opcoes);
  const nomes = Object.fromEntries(opcoes.map((o) => [o.id, o.nome]));

  const linhas = [
    'Resumo',
    'Nome;Votos',
    ...opcoes.map((o) => `${o.nome};${contagem[o.id]}`),
    `Total;${votos.length}`,
    '',
    'Votos individuais',
    'Nº;Nome;Data/hora',
    ...votos.map((v, i) => `${i + 1};${nomes[v.id] ?? v.id};${new Date(v.quando).toLocaleString('pt-BR')}`),
  ];
  return linhas.join('\n');
}

export function baixarCsv(conteudo: string, nomeArquivo: string): void {
  // BOM para o Excel reconhecer UTF-8 (acentos)
  const blob = new Blob(['\ufeff' + conteudo], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(url);
}
