**RF** => Requisitos Funcionais
**RNF** => Requisitos Não Funcionais
**RN** => Regra de Negócio

# Cadastro de Carro

**RF** => Requisitos Funcionais
Deve ser possível cadastrar um novo carro;

**RN** => Regra de Negócio
Não deve ser possível cadastrarum carro com uma placa já existente;
O carro deve ser cadastrado como disponível por padrão;
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF** => Requisitos Funcionais
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN** => Regra de Negócio
O usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

**RF** => Requisitos Funcionais
Deve ser possível cadastrar uma especificação para um carro

**RN** => Regra de Negócio
Não deve ser possível cadastrar uma especificação para uma carro não cadastrado
Mão deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF** => Requisitos Funcionais
Deve ser possível cadastrar a imagem do carro

**RNF** => Requisitos Não Funcionais
Utilizar o Multer para upload dos arquivos

**RN** => Regra de Negócio
O usuário pode cadastrar mais de uma imagem para o memso carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF** => Requisitos Funcionais
Deve ser possível cadastrar um aluguel

**RN** => Regra de Negócio
O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
O usuário deve estar logado na aplicação

# Devolução do carro

**RF** => Requisitos Funcionais
Deve ser possível realizar a devolução do carro

**RN** => Regra de Negócio
Se o carro for devolvido com menos de 24horas, deverá ser cobrado diária completa
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na devolução

# Recuperar senha

**RF** => Requisitos Funcionais

- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN** => Regra de Negócio

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas
