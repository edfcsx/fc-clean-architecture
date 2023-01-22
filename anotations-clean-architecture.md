### Pontos importantes sobre arquitetura
- Formato que o software terá
- Divisão de componentes
- Comunicação entre componentes
- Uma boa arquitetura vai facilitar o processo de desenvolvimento, deploy, operação e manutenção.

"The strategy behind that facilitation is to leave as many options open as possible, for as long as possible"
C, Martin Robert. Clean Architecture

<b>Objetivos de uma boa arquitetura</b><br>
O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema, uma boa arquitetura torna o sistema fácil de entender, fácil de desenvolver, fácil ede manter e fácil de implantar. O objetivo final é minimizar o custo de vida útil do sistema e maximizar a produtividade do programador.

C., Martin Robert. Clean Architecture

### Regras vs Detalhes
- Regras de negócio trazem o real valor para o software
- Detalhes ajudam a suportar as regras
- Detalhes não devem impactar nas regras de negócio
- Frameworks, banco de dados, apis, não devem impactar as regras

### Use Cases
- Intenção
- Clareza de cada comportamento do software
- Detalhes não devem impactar nas regras de negócio (keep options open)
- Frameworks, banco de dados, apis, não devem impactar as regras

### Use Cases vs SRP (Single Responsability Principle)
- Temos a tendência de "reaproveitar" use cases por serem muito parecidos.
- Ex: Alterar vs inserir. Ambos consultam se o registro existe, persistem dados. MAS, são Use Cases diferentes. Por que?
- SRP (Single Responsability Principle) => mudam por razões diferentes

### Limites Arquiteturais
Tudo que não impacta diretamente nas regras do negócio deve estar em um limite arquitetural diferente. Ex: não será o frontend, banco de dados que mudarão as regras do negócio da aplicação.

### DTO (Data Transfer Object)
- Ajuda a trafegar os dados entre os limites arquiteturais
- Objeto anêmico, sem comportamento
- Contém dadados (input ou output)
- Não possui regras de negócio, comportamento, simplesmente não faz nada.

### Presenters
- Objetos de transformação (recebem dados), adequando o DTO de input no formato correto para entrega dos dados.

### Entities
- Entities da Clean Architecture != Entities do DDD
- Clean Architecture define entity como camada de regras de negócio
- Clean Architecture não há definição explicita de como criar entities
- Normalmente utilizamos táticas do DDD
- Entities = Agregados + Domain Services