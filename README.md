# Processo seletivo para avaliação de conhecimento em Qualidad de Software

Este repositório contém a resolução de desafios propostos pela empresa **Dot** como parte do processo seletivo para ingresso na equipe. O objetivo principal deste projeto foi demonstrar habilidades em qualidade de software de um sistema, escolhido a preferência do analista, e assegurar que os critérios de entrega e aceite foram cumpridos.

A plataforma utilizada, **ServeRest**, oferece um ambiente de simulação para testes de funcionalidades essenciais de um sistema de compras online. A automação dos cenários propostos foi desenvolvida utilizando o framework **Cypress**, permitindo garantir a qualidade e a integridade das funcionalidades, mesmo com futuras alterações no código.

## Sobre o Projeto

O código aqui desenvolvido reflete o compromisso em entregar soluções robustas e automatizadas para desafios reais de desenvolvimento, conforme as especificações exigidas pela **Dot**. Cada cenário de teste foi escolhido estrategicamente para cobrir alguns fluxos principais do sistema, assegurando que as funcionalidades críticas estejam operando conforme esperado.

Sinta-se à vontade para explorar o repositório e conferir os testes, decisões, automações e a configuração da **GitHub Action** implementada!

## User Story: Gerenciar Produtos na Lista de Compras em Sistema Open Source

Como um usuário autenticado da plataforma ServeRest,  
Eu quero gerenciar os produtos de minha lista de compras,  
Para que eu possa controlar os itens que desejo adquirir.  

### Critérios de Aceitação:

1. **Visualização de Produtos**:  
   - Eu devo ser capaz de visualizar a listagem de produtos disponíveis no sistema.
   - Eu devo poder acessar os detalhes de produtos específicos.

2. **Adição de Produtos**:  
   - Eu devo poder adicionar produtos à minha lista de compras, um de cada vez, por meio de um botão de incremento.
   
3. **Remoção de Produtos**:  
   - Eu devo poder remover produtos da lista de compras, um de cada vez, utilizando um botão de decremento.
   - O botão de decremento deve estar desabilitado quando a quantidade mínima de 1 unidade por produto for atingida, impedindo a remoção além desse valor.

4. **Limites de Incremento/Decremento**:  
   - Eu não devo conseguir aumentar ou diminuir a quantidade de produtos de outra maneira que não seja pelos botões de incremento e decremento fornecidos pelo sistema.

5. **Remoção Total de Produtos**:  
   - Eu devo poder remover todos os produtos da minha lista de compras de uma vez, mas ainda não será possível remover um único tipo de produto diretamente.

### Regras de Negócio:
- A quantidade mínima permitida por produto é 1 unidade.
- A remoção total de produtos permite limpar toda a lista de compras, mas a remoção individual de um tipo de produto não é permitida no momento.

### Critérios de Aceite

1. O usuário deve ser capaz de visualizar uma lista de produtos disponíveis.
2. O usuário deve poder ver os detalhes de um produto específico ao clicar no mesmo.
3. O usuário pode adicionar produtos à lista de compras, com o número de unidades incrementado um a um.
4. O usuário pode remover produtos da lista, com o número de unidades decrementado um a um, até um mínimo de 1 unidade por produto.
   - O botão de decremento deve estar desabilitado quando a quantidade for 1.
5. O usuário não deve conseguir incrementar ou decrementar produtos de outra forma além dos botões disponíveis.
6. A remoção de todos os produtos da lista é permitida, mas não é possível remover um único tipo de produto isoladamente.

## Casos de Teste

1. **Visualização da lista de produtos**:
   - Verificar se a lista de produtos é carregada corretamente após o login.
   
2. **Visualização dos detalhes de um produto**:
   - Testar se ao clicar em um produto específico, os detalhes corretos são exibidos.

3. **Adicionar produtos à lista**:
   - Verificar se o produto é adicionado corretamente à lista e se o número de unidades incrementa um a um.
   
4. **Remover produtos da lista**:
   - Testar se o produto é removido da lista de maneira adequada, decrementando um a um até o mínimo de 1 unidade.
   - Verificar se o botão de decremento está desabilitado quando o número de unidades for 1.

5. **Remover todos os produtos da lista**:
   - Testar a funcionalidade de remover todos os produtos da lista.

6. **Restrições de remoção**:
   - Verificar se é possível remover todos os produtos, mas não um único tipo isoladamente.

7. **Restrições de incremento/decremento**:
   - Testar se o incremento/decremento de produtos só ocorre através dos botões dedicados.
   - Verificar se o decremento abaixo de 1 unidade é impedido com o botão desabilitado.

## Estimativa de Tempo de Teste

1. **Configuração do Ambiente de Teste** (2 horas)

Essa etapa envolve a preparação do ambiente para a execução de testes automatizados com o Cypress. As atividades incluem:

- **Instalação e configuração do Cypress**: Garantir que o Cypress está corretamente instalado e integrado ao projeto.
- **Configuração do ambiente de testes**: Definir as dependências e o arquivo de configuração (`cypress.json`) adequados.
- **Configuração de rotas e mocks**: Mockar endpoints da API para evitar dependências externas.
- **Validação inicial**: Executar um teste simples para garantir o funcionamento do Cypress.

A estimativa de 2 horas considera que o ambiente é típico de e-commerce e possui uma complexidade moderada.

2. **Implementação dos Testes de Visualização e Detalhes de Produtos** (3 horas)

Nesta etapa, serão desenvolvidos testes para garantir o correto funcionamento da exibição da lista de produtos e da página de detalhes. As atividades incluem:

- **Testes de carregamento da lista de produtos**: Verificar se a lista é carregada corretamente, incluindo nome, preço e imagem dos produtos.
- **Testes de visualização de detalhes de produtos**: Testar se, ao clicar em um produto, o usuário é direcionado à página de detalhes e se as informações aparecem corretamente.

A estimativa de 3 horas cobre o desenvolvimento dos testes para diferentes produtos e a validação dos elementos exibidos.

3. **Testes de Adição e Remoção de Produtos** (4 horas)

Aqui, serão testadas as funcionalidades de adicionar e remover produtos do carrinho. As atividades incluem:

- **Testes de adição de produtos ao carrinho**: Verificar se a quantidade e o preço total são atualizados ao adicionar um produto.
- **Testes de remoção de produtos do carrinho**: Garantir que, ao remover um produto, o carrinho e o preço total são atualizados corretamente.
- **Testes de incremento/decremento**: Validar se os botões de incremento e decremento de quantidade estão funcionando como esperado.

A estimativa de 4 horas leva em consideração a complexidade de testar interações diretas com o DOM e o estado do carrinho.

4. **Testes de Restrições de Incremento/Decremento** (3 horas)

Essa etapa foca em garantir que as regras de negócios, como limites de quantidade, estão sendo corretamente aplicadas. As atividades incluem:

- **Verificação dos limites de quantidade**: Testar se o botão de decremento é desativado ao atingir 1 unidade e se há limites máximos de estoque.
- **Testes de desabilitação de botões**: Garantir que os botões de incremento e decremento respeitam as restrições definidas.

A estimativa de 3 horas inclui testes para diferentes cenários de limite de quantidade e as regras de habilitação/desabilitação de botões.

### Total Estimado: 12 horas

A soma das estimativas de cada etapa resulta em um total de 12 horas, levando em conta a complexidade de cada área de teste e a necessidade de validar diversas interações e cenários.

## Desenvolvimento dos Testes Automatizados (Cypress)

Escolhi os cenários de automação com base em sua relevância para o fluxo principal de uso e para as funcionalidades mais críticas do sistema. A seguir, detalho as razões por trás de cada escolha:

1. **Visualização da lista de produtos**:  
   - Este é o primeiro ponto de interação do usuário após o login. Garantir que a lista de produtos carregue corretamente é fundamental, pois, sem essa visualização, as demais funcionalidades tornam-se inacessíveis. Esse é o cenário mais básico e essencial para testar a disponibilidade do sistema.

2. **Visualização dos detalhes de um produto**:  
   - Validar se o usuário consegue acessar as informações detalhadas de um produto é crucial para que ele tome decisões de compra informadas. Automatizar este teste garante que a navegação entre a lista de produtos e seus detalhes funcione corretamente.

3. **Adicionar produtos à lista de compras**:  
   - O processo de adicionar produtos é um dos principais objetivos do sistema. Testar essa funcionalidade é essencial para assegurar que o fluxo de compra ocorra conforme o esperado e que o incremento de itens funcione corretamente. Este é um cenário central para a experiência do usuário.

4. **Remover produtos da lista de compras**:  
   - Assim como adicionar, a remoção de produtos é uma operação essencial. Esse teste verifica se o usuário consegue remover produtos da lista e se as regras de decremento (como reduzir item por item, até o mínimo de uma unidade) estão sendo respeitadas. Isso garante que o sistema opere conforme os requisitos de negócio.

5. **Impedir decremento abaixo de 1 unidade**:  
   - Este cenário garante que as restrições de decremento sejam respeitadas, evitando que a quantidade de produtos seja reduzida para menos de uma unidade. Como essa é uma regra específica do sistema, automatizar esse teste assegura que a interface não permita ações inválidas, mantendo a integridade das operações.

### Justificativa geral:

Esses cenários cobrem as principais funcionalidades relacionadas à gestão de produtos: visualização, adição, remoção e conformidade com as regras de negócio (restrições de decremento). Foram escolhidos por representarem os fluxos mais utilizados e críticos, além de contemplarem interações fundamentais esperadas do sistema. Ao automatizar esses casos, é possível testar continuamente as principais funcionalidades e garantir que futuras alterações no código não provoquem regressões.

## Arquivo de Pipeline para Execução de Testes

Uma **GitHub Action** foi adicionada ao repositório para executar os testes automaticamente em cada _push_ ou _pull request_, implementando um pipeline de integração contínua (CI) para garantir a validação contínua das funcionalidades testadas.

