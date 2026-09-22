import { useState } from 'react';
import { CONFIG } from '../config/votacao';
import { Modal } from './Modal';

const TECLAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'OK'];

interface Props {
  onSucesso: () => void;
  onCancelar: () => void;
}

export function PinAdmin({ onSucesso, onCancelar }: Props) {
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');

  const tocar = (tecla: string) => {
    setErro('');
    if (tecla === '⌫') return setPin((p) => p.slice(0, -1));
    if (tecla === 'OK') {
      if (pin === CONFIG.pinAdmin) return onSucesso();
      setErro('PIN incorreto.');
      return setPin('');
    }
    setPin((p) => (p.length < 8 ? p + tecla : p));
  };

  return (
    <Modal>
      <h2 className="subtitulo">Área do responsável</h2>
      <div className="pin__visor">{'•'.repeat(pin.length)}</div>
      <div className="pin__teclado">
        {TECLAS.map((t) => (
          <button key={t} className="pin__tecla" onClick={() => tocar(t)}>{t}</button>
        ))}
      </div>
      <div className="pin__erro" role="alert">{erro}</div>
      <div className="botoes">
        <button className="btn btn--cinza btn--peq" onClick={onCancelar}>Cancelar</button>
      </div>
    </Modal>
  );
}
