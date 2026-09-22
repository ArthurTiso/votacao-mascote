# Votação do Mascote da Saúde Bucal

Sistema de votação por toque para um display digital (TV touch conectada a um computador), usado por crianças para escolher o nome do mascote da saúde bucal de uma escola.

Desenvolvido no estágio de TI da Prefeitura Municipal de Caraguatatuba.

## Funcionalidades

- A arte da cédula é a própria interface: cada faixa de nome é uma área de toque.
- Confirmação antes de registrar o voto, com cancelamento automático após 20 s sem resposta.
- Tela de agradecimento com bloqueio temporário de toques (evita votos duplicados).
- Área do responsável protegida por PIN, com:
  - resultado com ranking, percentuais, vencedor e tratamento de empate;
  - exportação CSV (resumo + votos individuais com data/hora);
  - modo tela cheia;
  - zerar votação com confirmação dupla.
- Votos persistidos no `localStorage`.
- Build em arquivo único: roda offline, abrindo o `index.html` direto no navegador.

## Stack

React 19 · TypeScript · Vite · Vitest · vite-plugin-singlefile · @fontsource

## Estrutura

```
src/
├── App.tsx                 # Máquina de estados das telas
├── components/             # Cedula, ModalConfirmacao, TelaObrigado, PinAdmin, PainelResultado...
├── config/votacao.ts       # Opções, coordenadas na arte e parâmetros
├── hooks/                  # useVotos (persistência), useLarguraTela
├── utils/                  # apuracao (+ testes), csv
└── styles/global.css
```

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm test         # testes da apuração
npm run build    # gera dist/index.html
```

## Uso na TV

1. Rodar `npm run build` e copiar `dist/index.html` para o computador da TV.
2. Abrir em modo quiosque:
   ```
   chrome --kiosk "file:///C:/votacao/index.html"
   ```
3. Acessar a área do responsável pelo botão ⚙ (canto superior direito) ou `Ctrl + Alt + R`.

Os votos ficam salvos por navegador e por caminho do arquivo. Mantenha sempre o mesmo navegador e o mesmo local do arquivo.

## Configuração

- **PIN:** copie `.env.example` para `.env` e defina `VITE_PIN_ADMIN` antes do build.
- **Opções / arte:** edite `OPCOES` e `IMAGEM` em `src/config/votacao.ts`. As coordenadas estão em pixels da imagem original.
