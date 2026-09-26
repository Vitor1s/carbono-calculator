# Carbono Calculator

Calculadora simples de emissao de CO2 por rota e meio de transporte.

## Links

- Aplicacao publicada: https://vitor1s.github.io/carbono-calculator/

## Como usar

1. Informe a origem e o destino. Os campos exibem sugestoes apenas com locais
   presentes nas rotas cadastradas, mas tambem permitem digitacao manual.
2. Mantenha a distancia automatica para usar uma rota cadastrada. Para uma
   rota diferente, ative `Definir manualmente` e informe a distancia em km.
3. Escolha um meio de transporte: bicicleta, carro, onibus ou caminhao.
4. Informe a quantidade de passageiros.
5. Clique em `Calcular emissao`.

O resultado mostra a emissao total, a emissao por passageiro, os creditos de
carbono estimados e uma comparacao com os outros meios de transporte. Um
credito de carbono representa 1.000 kg de CO2 para fins desta estimativa.

## Estrutura

- `index.html`: estrutura da pagina e scripts carregados.
- `css/style.css`: estilos da aplicacao.
- `js/routes-data.js`: dados das rotas disponiveis.
- `js/config.js`: fatores de emissao e nomes dos transportes.
- `js/calculator.js`: regras de calculo.
- `js/ui.js`: funcoes de atualizacao da interface.
- `js/app.js`: inicializacao e eventos da aplicacao.

Abra `index.html` no navegador para executar o projeto.
