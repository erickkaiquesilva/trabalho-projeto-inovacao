/*
    ABAIXO: Se encontra os dados dos ID's nomeados
    na DASHBOARD.EJS, por ele eu terei acesso e enviarei as informações que coleteio do 
    banco e mostrarei dentro deles.
*/

// As variaeis criadas abaixo, são responsaveis por da enviar as infos para dashboard
let sensor1 = document.getElementById("temp1");
let sensor2 = document.getElementById("temp2");
let sensor3 = document.getElementById("temp3");
let sensorUmi = document.getElementById("umi1");
let mediaTemp = document.getElementById("mediaTemp");
let mediaUmi = document.getElementById("mediaUmi");
let pQuartilTemp = document.getElementById("pquartilTemp");
let tQuartilTemp = document.getElementById("tquartilTemp");
let pQuartilUmi = document.getElementById("pquartilUmi");
let tQuartilUmi = document.getElementById("tquartilUmi");
let alertaUsuario = document.getElementById("alert-line");
// O objeto e varivaeis abaixo, são criadas para dar alert para o usuario
let dados = {};

let alertLine = document.getElementById("alert-line");




/*
    ABAIXO: Irei passar as informações das ultimas ocorrencias obtidas no banco de dados
    e informa na pagina da DASHBOARD

    As funções abaixo tem como dever informar as ocorrencias de ultimas inserção de temperatura no bancod de dados
    de trazer informações de média de TEMPERATURA e UMIDADE, e tambem mostra o Primeiro Quartil e Terceiro Quartil
    na seção de apontadores.
*/
function ultOcorrenciasDados() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/ultimosDados",
        success: function (data) {
            sensor1.textContent = data.ultTempSuperior;
            sensor2.textContent = data.ultTempCentro;
            sensor3.textContent = data.ultTempInferior;
            sensorUmi.textContent = data.ultUmiCentro;

            dados.temp = data.ultTempCentro;
            dados.temp = data.ultUmiCentro;
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });

}

function Media() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/apontaMedia",
        success: function (data) {
            console.log(data);
            mediaTemp.textContent = data.mediaTemp;
            mediaUmi.textContent = data.mediaUmi;
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function Quartil() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/Quartil",
        success: function (data) {
            console.log(data);
            pQuartilTemp.textContent = data.pQuartilTemp;
            tQuartilTemp.textContent = data.tQuartilTemp;
            pQuartilUmi.textContent = data.pQuartilUmi;
            tQuartilUmi.textContent = data.tQuartilUmi;
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function AlertUser() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/alert/alertUser",
        success: function (data) {
            if (dados.temp != undefined) {
                if (dados.temp >= data.alertMaxTemp || dados.temp <= data.alertMinTemp) {

                    alertLine.style.display = 'block';

                } else {

                    alertLine.style.display = 'none';
                }

                if (dados.umi <= data.alertMaxUmi || dados.umi >= data.alertMinUmi) {

                    alertLine.style.display = 'block';

                } else {

                    alertLine.style.display = 'none';

                }
            }

        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}


/*
    ABAIXO: Eu estarei chamando todas as funções para que elas sejam executadas
*/




setTimeout(() => {
    Media();
    Quartil();
    ultOcorrenciasDados();
}, 0);



setInterval(() => {
    ultOcorrenciasDados();
    AlertUser();
}, 5000);