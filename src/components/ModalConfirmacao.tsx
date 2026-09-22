import { useEffect } from 'react';
import { CONFIG, type Opcao } from '../config/votacao';
import { useLarguraTela } from '../hooks/useLarguraTela';
import { Modal } from './Modal';
import { RecorteOpcao } from './RecorteOpcao';

interface Props {
  opcao: Opcao;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ModalConfirmacao({ opcao, onConfirmar, onCancelar }: Props) {
  const larguraTela = useLarguraTela();

  // Cancela automaticamente se a criança sair sem responder
  useEffect(() => {
    const t = setTimeout(onCancelar, CONFIG.tempoLimiteConfirmacaoMs);
    return () => clearTimeout(t);
  }, [onCancelar]);

  return (
    <Modal>
      <h2>Você escolheu:</h2>
      <RecorteOpcao opcao={opcao} largura={Math.min(larguraTela * 0.6, 700)} marcado />
      <h2 className="subtitulo">É esse mesmo?</h2>
      <div className="botoes">
        <button className="btn btn--nao" onClick={onCancelar}>✖ Quero trocar</button>
        <button className="btn btn--sim" onClick={onConfirmar}>✔ Sim, é esse!</button>
      </div>
    </Modal>
  );
}
