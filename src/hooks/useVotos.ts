import { useCallback, useEffect, useState } from 'react';
import { CONFIG } from '../config/votacao';
import type { Voto } from '../types';

function carregar(): Voto[] {
  try {
    const bruto = localStorage.getItem(CONFIG.chaveStorage);
    const dados = bruto ? JSON.parse(bruto) : null;
    return Array.isArray(dados?.log) ? dados.log : [];
  } catch {
    return [];
  }
}

/** Estado dos votos persistido no localStorage (compatível com a versão HTML anterior). */
export function useVotos() {
  const [votos, setVotos] = useState<Voto[]>(carregar);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG.chaveStorage, JSON.stringify({ log: votos }));
    } catch (e) {
      console.error('Falha ao salvar votos', e);
    }
  }, [votos]);

  const registrar = useCallback((id: string) => {
    setVotos((atual) => [...atual, { id, quando: new Date().toISOString() }]);
  }, []);

  const zerar = useCallback(() => setVotos([]), []);

  return { votos, registrar, zerar };
}
