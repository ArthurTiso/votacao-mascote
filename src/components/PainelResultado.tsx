import { useEffect, useState } from 'react';
import { OPCOES } from '../config/votacao';
import { useLarguraTela } from '../hooks/useLarguraTela';
import type { Voto } from '../types';
import { apurar } from '../utils/apuracao';
import { baixarCsv, gerarCsv } from '../utils/csv';
import { Modal } from './Modal';
import { RecorteOpcao } from './RecorteOpcao';

interface Props {
  votos: Voto[];
  onVoltar: () => void;
  onZerar: () => void;
}

export function PainelResultado({ votos, onVoltar, onZerar }: Props) {
  const { total, ranking, lideres } = apurar(votos, OPCOES);
  const larguraTela = useLarguraTela();
  const [animar, setAnimar] = useState(false);

  // Dispara a animação das barras após a montagem
  useEffect(() => {
    const quadro = requestAnimationFrame(() => setAnimar(true));
    return () => cancelAnimationFrame(quadro);
  }, []);

  const exportar = () =>
    baixarCsv(gerarCsv(votos, OPCOES), `votacao_mascote_${new Date().toISOString().slice(0, 10)}.csv`);

  const alternarTelaCheia = () =>
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  const zerar = () => {
    if (!confirm('Apagar TODOS os votos? Esta ação não pode ser desfeita.')) return;
    if (prompt('Digite ZERAR para confirmar:') === 'ZERAR') onZerar();
  };

  return (
    <Modal className="resultado">
      <h2>Resultado da votação</h2>

      {total === 0 && <p className="resultado__total">Nenhum voto registrado ainda.</p>}

      {lideres.length === 1 && (
        <div className="vencedor">
          <RecorteOpcao opcao={lideres[0]} largura={Math.min(larguraTela * 0.35, 420)} />
          <div>
            <h3>Nome escolhido</h3>
            <strong>{lideres[0].nome}</strong>
            <h3>{ranking[0].votos} voto{ranking[0].votos !== 1 && 's'}</h3>
          </div>
        </div>
      )}

      {lideres.length > 1 && (
        <div className="vencedor">
          <div>
            <h3>Empate com {ranking[0].votos} votos</h3>
            <strong>{lideres.map((l) => l.nome).join(' e ')}</strong>
          </div>
        </div>
      )}

      {ranking.map(({ opcao, votos: qtd, percentual }) => (
        <div key={opcao.id} className="linha">
          <span>{opcao.nome}</span>
          <div className="linha__trilho">
            <div
              className="linha__barra"
              style={{ background: opcao.cor, width: animar ? `${percentual}%` : 0 }}
            />
          </div>
          <span className="linha__num">{qtd} ({percentual.toFixed(0)}%)</span>
        </div>
      ))}

      <div className="resultado__total">Total de votos: {total}</div>

      <div className="resultado__acoes">
        <button className="btn btn--azul btn--peq" onClick={onVoltar}>Voltar à votação</button>
        <button className="btn btn--cinza btn--peq" onClick={exportar}>Baixar votos (CSV)</button>
        <button className="btn btn--cinza btn--peq" onClick={alternarTelaCheia}>Tela cheia</button>
        <button className="btn btn--nao btn--peq" onClick={zerar}>Zerar votação</button>
      </div>
    </Modal>
  );
}
