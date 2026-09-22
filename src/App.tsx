import { useCallback, useEffect, useState } from 'react';
import { Cedula } from './components/Cedula';
import { ModalConfirmacao } from './components/ModalConfirmacao';
import { PainelResultado } from './components/PainelResultado';
import { PinAdmin } from './components/PinAdmin';
import { TelaObrigado } from './components/TelaObrigado';
import { OPCOES, type Opcao } from './config/votacao';
import { useVotos } from './hooks/useVotos';

/** Máquina de estados das telas */
type Tela =
  | { tipo: 'votacao' }
  | { tipo: 'confirmar'; opcao: Opcao }
  | { tipo: 'obrigado' }
  | { tipo: 'pin' }
  | { tipo: 'resultado' };

export default function App() {
  const { votos, registrar, zerar } = useVotos();
  const [tela, setTela] = useState<Tela>({ tipo: 'votacao' });

  const voltar = useCallback(() => setTela({ tipo: 'votacao' }), []);

  const abrirAdmin = useCallback(() => {
    // Não interrompe o agradecimento (evita perder o fluxo do voto)
    setTela((atual) => (atual.tipo === 'obrigado' ? atual : { tipo: 'pin' }));
  }, []);

  const confirmar = () => {
    if (tela.tipo !== 'confirmar') return;
    registrar(tela.opcao.id);
    setTela({ tipo: 'obrigado' });
  };

  // Atalho de teclado: Ctrl + Alt + R
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        abrirAdmin();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [abrirAdmin]);

  return (
    <>
      <button className="btn-admin" onClick={abrirAdmin} aria-label="Área do responsável" title="Área do responsável">
        ⚙
      </button>

      <main className="votacao">
        <section className="instrucao">
          <div className="instrucao__mao" aria-hidden></div>
          <h1>Toque no nome que você mais gosta!</h1>
          <p>Você pode escolher só um.</p>
        </section>
        <Cedula
          opcoes={OPCOES}
          onEscolher={(opcao) => tela.tipo === 'votacao' && setTela({ tipo: 'confirmar', opcao })}
        />
      </main>

      {tela.tipo === 'confirmar' && (
        <ModalConfirmacao opcao={tela.opcao} onConfirmar={confirmar} onCancelar={voltar} />
      )}
      {tela.tipo === 'obrigado' && <TelaObrigado onFim={voltar} />}
      {tela.tipo === 'pin' && <PinAdmin onSucesso={() => setTela({ tipo: 'resultado' })} onCancelar={voltar} />}
      {tela.tipo === 'resultado' && <PainelResultado votos={votos} onVoltar={voltar} onZerar={zerar} />}
    </>
  );
}
