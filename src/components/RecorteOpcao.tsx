import cedula from '../assets/cedula.jpg';
import { IMAGEM, type Opcao } from '../config/votacao';

interface Props {
  opcao: Opcao;
  /** Largura de exibição em px */
  largura: number;
  marcado?: boolean;
}

/** Exibe a faixa da opção recortada diretamente da arte da cédula. */
export function RecorteOpcao({ opcao, largura, marcado = false }: Props) {
  const escala = largura / IMAGEM.recorteLargura;
  const altura = opcao.h * escala;

  return (
    <div
      className="recorte"
      role="img"
      aria-label={opcao.nome}
      style={{
        width: largura,
        height: altura,
        backgroundImage: `url(${cedula})`,
        backgroundSize: `${IMAGEM.largura * escala}px ${IMAGEM.altura * escala}px`,
        backgroundPosition: `${-IMAGEM.recorteX * escala}px ${-opcao.y * escala}px`,
      }}
    >
      {marcado && (
        <span className="recorte__marca" style={{ fontSize: altura * 0.7 }} aria-hidden>
          ✔
        </span>
      )}
    </div>
  );
}
