import cedula from '../assets/cedula.jpg';
import { IMAGEM, type Opcao } from '../config/votacao';

interface Props {
  opcoes: Opcao[];
  onEscolher: (opcao: Opcao) => void;
}

/** Arte da cédula com áreas de toque posicionadas sobre cada faixa de nome. */
export function Cedula({ opcoes, onEscolher }: Props) {
  return (
    <div className="cedula" role="group" aria-label="Opções de nome">
      <img className="cedula__arte" src={cedula} alt="" draggable={false} />
      {opcoes.map((op) => (
        <button
          key={op.id}
          className="cedula__opcao"
          aria-label={op.nome}
          onClick={() => onEscolher(op)}
          style={{
            left: `${(IMAGEM.recorteX / IMAGEM.largura) * 100}%`,
            width: `${(IMAGEM.recorteLargura / IMAGEM.largura) * 100}%`,
            top: `${(op.y / IMAGEM.altura) * 100}%`,
            height: `${(op.h / IMAGEM.altura) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
