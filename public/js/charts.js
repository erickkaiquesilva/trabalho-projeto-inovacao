// As Constantes ctx, btx esta acessando uma class com o nome line-chart e bar-chart, essas variaveis esta recebendo as configurações
// do gráfico.

/*
    As const abaixo são constantes padrões que recebem os ID nomeados na página html.

    CTX - RECEBE O GRÁFICO EM LINHA QUE EXISTE NA DASHBOARD
    BTX - RECEBE O GRÁFICO EM BARRAS QUE EXISTE NA DASHBOARD
    LTX - RECEBE O GRÁFICO EM LINHA QUE EXISTE NA DASHBOARD

*/
const ctx = document.getElementsByClassName("line-chart");
const btx = document.getElementsByClassName("bar-chart");
const ltx = document.getElementsByClassName("line-time");
const piz = document.getElementsByClassName("chart-pizza");

const tempDois = document.getElementById("tempDois");
const umidade = document.getElementById("umidade");


let moment = [];

/*

setInterval(() =>{
    dadosFullSensorSuperior();
    dadosFullSensorCentro();
    dadosFullSensorInferior();
    ChartPizza();
}, 7000);
*/

/*
    barChart é uma variavel que retorna o chart/Grafico de barras

    type seria o tipo de gráfico
    data são as informações que serão exibidas no grafico

    Sempre que desejar armazena mais uma barra após o fechamento das chaves do data coloca uma virgula
    e inicia o mesmo procedimento que foi feito na primeira.

    labels são os dados em texto sobre o que as barras estão apresentando
    datasets armazena os dados que sera contido na barra do gráfico.
*/

/*
    Este Gráfico é responsavel por mostrar as informações em coletadas em tempo
*/
var lineTime = new Chart(ltx, {

    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Sensor1",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,165,253,0.85)',
            backgroundColor: 'transparent'
        },
        {
            label: "Sensor2",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(5,125,13,0.85)',
            backgroundColor: 'transparent'
        },
        {
            label: "Sensor3",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(7,155,23,0.85)',
            backgroundColor: 'transparent'
        },
        {
            label: "UmiSensor1",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,15,253,0.85)',
            backgroundColor: 'transparent'
        }]
    }
});


var Chartdoughnut = new Chart(piz, {

    type: 'doughnut',
    data: {
        datasets: [{
            data: [],
            "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)"]
        }],

        labels: [
            'Temperatura',
            'Umidade'
        ]
    }
});

// Gráfico de Barras
var barChart = new Chart(btx, {
    type: 'bar',
    data: {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [{
            label: "Temperatura Média",
            data: [],
            borderWidth: 2,
            borderColor: 'rgba(255, 99, 132, 0.85)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        },
        {
            label: "Umidade Média",
            data: [],
            borderWidth: 2,
            borderColor: 'rgba(255, 159, 64, 0.85)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)'
        }]
    }
});


// Gráfico de Linha
var chartGraph = new Chart(ctx, {

    type: 'line',
    data: {
        labels: ['03/12', '04/12', '05/12', '06/12', '07/12'],
        datasets: [{
            label: "Temperatura Média Semana",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,165,253,0.85)',
            backgroundColor: 'transparent'
        },
        {
            label: "Umidade Média Semana",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,15,253,0.85)',
            backgroundColor: 'transparent'
        }]
    }
});
/*
    A função carTempUmi ela retorna um ajax que esta buscando as temperaturas e umidades do banco 
    esta contida na url: "/dashboard/leituras"

    o success tem uma função que tem como parametro um array data.
    Nessa função estou acessando a variavel do grafico, logo depois acessando o objeto na posição data depois o datasets que é um array
    e na posição que escolho e o objeto que ha dentro do array no ponto data que vai ser igual a data que é o objeto
    data da função sucess na posição do objeto eu acesso a temp.


    A lógica é replicada para as demais função que retorna ajax.
*/

/*
    As funções a Baixo elas cuida de enviar as informações coletadas no banco de dados
    de cada sensor e enviar para o grafico full time.
*/

function dadosFullSensorSuperior() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/leituraSensorSuperior",
        success: function (data) {
            lineTime.data.datasets[0].data = data.tempSensorSuperior;
            lineTime.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function dadosFullSensorCentro() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/leituraSensorCentro",
        success: function (data) {
            lineTime.data.datasets[1].data = data.tempSensorCentro;
            lineTime.data.datasets[3].data = data.umiSensorCentro;
            lineTime.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function dadosFullSensorInferior() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/leituraSensorInferior",
        success: function (data) {
            lineTime.data.datasets[2].data = data.tempSensorInferior;
            lineTime.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function ChartPizza() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/apontaMedia",
        success: function (data) {
            Chartdoughnut.data.datasets[0].data[0] = data.mediaTemp;
            Chartdoughnut.data.datasets[0].data[1] = data.mediaUmi;
            Chartdoughnut.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function Semana() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/Semana",
        success: function (data) {
            chartGraph.data.datasets[0].data = data.dayOne;
            chartGraph.data.datasets[1].data = data.dayTwo;
            chartGraph.data.datasets[0].data = data.dayThree;
            chartGraph.data.datasets[1].data = data.dayFor;
            chartGraph.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

function Mensal() {
    $.ajax({
        cache: false,
        method: "get",
        url: "/grafico/Semana",
        success: function (data) {
            barChart.data.datasets[0].data = data.dayOne;
            barChart.data.datasets[1].data = data.dayTwo;
            barChart.data.datasets[0].data = data.dayThree;
            barChart.data.datasets[1].data = data.dayFive;
            barChart.update();
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}

ChartPizza();
Semana();
Mensal();

setInterval(() => {
    dadosFullSensorSuperior();
    dadosFullSensorCentro();
    dadosFullSensorInferior();
}, 7000);
