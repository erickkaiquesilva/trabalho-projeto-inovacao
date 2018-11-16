/*
    Arquivo JS que simula um sensor ficticio para envio de informações ao banco de dados
*/
// Chamando o Arquivo data e exportando o modulos SQL do Arduino
let db = require("./database/data").Arduino;

// Função que fica se alto executando de 1 segundo em 1 segundo para criação de dados
setInterval(() => {

    // Função responsavel por criar a temperatura ficticia
    function temp() {
        return temperatura = 9 + Math.floor(Math.random() * 7);;
    }
    // Função responsavel por criar a umidade ficticia
    function umi() {

        umidade = 65 + Math.floor(Math.random() * 3);

        if(umidade > 68){
            umidade = 65 + Math.floor(Math.random() - 4);
        }else if(umidade < 58){
            umidade = 65 + Math.floor(Math.random() * 3);
        }

        return umidade;
    }

    // Enviando e retornando o valor das funções para as variaveis Temperatura e Umidade

    let temperatura = 0;
    let umidade = 0;
    let date = "CURRENT_TIMESTAMP";

    temperatura = temp(temperatura);
    umidade = umi(umidade);

    // Objeto que armazena as informações e envia para o insert do arduino
    var obj = {
        temp: temperatura,
        umi: umidade,
        data: date
    }

    console.log(obj);


    // Chamando do modulo Arduino o SQL Insert para inserir as informações no banco
    //db.insertArduino(obj);

}, 1000);





