 <div>
  <h1 align="center">Sobre o Desafio</h1>
  <p>Para realizar o desafio, criei duas API's, uma que armazena as transações e outra que armazena o saldo
    de cada usuário.
  </p>
  <p>Na primeira API é armazenado um JSON no qual tem o id da transação, o id do usuário, o valor da transação,
    se é débito ou crédito e a data em que foi realizada; utilizei dois endpoints:
    geral, onde aparecem todas as transações que ocorreram, e individual, filtrando somente as que pertecem
    ao id do usuário. A segunda API, por meio do axios, pega as informações das transações do usuário e com esses 
    dados realizo um filtro para saber se é crédito ou débito e assim calcular o saldo do cliente, enviando
    para a API o id do usuário e o saldo da conta em formato JSON, e, caso já exista na API o saldo do cliente,
    ele é atualizado.
  </p>
  <p> As duas API's foram armazenadas no banco de dados mongodb, porque tive dificuldade em aplicar o redis para armazenar
   em cache, fazendo com que a aplicação não seja tão performática.
  </p>
    
    
</div>  

<div>
  <h1 align="center">Layout das API's</h1>
   <img src="./layout/layout-1.png" width=450> 
   <img src="./layout/layout-2.png" width=450> 
   <img src="./layout/layout-3.png" width=450> 
</div>

<div>
  <h1 align="center">Tecnologias utilizadas</h1>
  <ul>
    <li>Typescript</li>
    <li>Node.js</li>
    <ul>
      <li>Express</li>
      <li>Mongodb</li>
      <li>Dotenv</li>
      <li>Axios</li>
    </ul>
  </ul>
</div>
