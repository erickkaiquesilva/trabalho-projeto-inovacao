/*
    Arquivo JS que simula um sensor ficticio para envio de informações ao banco de dados
*/
// Chamando o Arquivo data e exportando o modulos SQL do Arduino
let db = require("./database/data").Arduino;

// Função que fica se alto executando de 1 segundo em 1 segundo para criação de dados
setInterval(() => {

    // Função responsavel por criar a temperatura ficticia
    function temp() {
        return temperatura = 12 + Math.floor(Math.random() * 7);;
    }

    // Enviando e retornando o valor das funções para as variaveis Temperatura e Umidade

    let temperatura = 0;
    let date = "CURRENT_TIMESTAMP";

    temperatura = temp(temperatura);

    // Objeto que armazena as informações e envia para o insert do arduino
    var dados = {
        temp: temperatura,
        data: date
    }

    console.log(dados);


    // Chamando do modulo Arduino o SQL Insert para inserir as informações no banco
    db.insertArduinoTres(dados);

}, 1000);





