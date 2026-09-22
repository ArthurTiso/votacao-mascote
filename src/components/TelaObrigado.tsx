import { useEffect } from 'react';
import { CONFIG } from '../config/votacao';
import { Confete } from './Confete';
import { Modal } from './Modal';

export function TelaObrigado({ onFim }: { onFim: () => void }) {
  useEffect(() => {
    const t = setTimeout(onFim, CONFIG.tempoObrigadoMs);
    return () => clearTimeout(t);
  }, [onFim]);

  return (
    <>
      <Modal className="obrigado">
        <div className="obrigado__emoji">😁</div>
        <h2>Voto registrado!</h2>
        <p>Obrigado por participar.</p>
      </Modal>
      <Confete duracaoMs={CONFIG.tempoObrigadoMs} />
    </>
  );
}
