var ctx = document.getElementsByClassName("line-chart");
var btx = document.getElementsByClassName("bar-chart");
var tempDois = document.getElementById("temp-real");
var umidade = document.getElementById("umi-real");


// O Gráfico trabalha com tres linhas
// São os Types, Data, Options

var arr = [];

console.log(arr);

// GRAPH EM BAR

setInterval(carDados, 2500);

var barChart = new Chart(btx, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"],
        datasets: [{
            label: "Temperatura Média",
            data: [],
            borderWidth: 2,
            borderColor: 'rgba(255, 99, 132, 0.85)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        },
        {
            label: "Umidade Média",
            data: [30, 23, 3, 32, 40, 45],
            borderWidth: 2,
            borderColor: 'rgba(255, 159, 64, 0.85)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)'
        }]
    }
});


// GRAPH EM LINE
var chartGraph = new Chart(ctx, {

    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "TEMPERATURA",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,165,253,0.85)',
            backgroundColor: 'transparent'
        },
        {
            label: "UMIDADE",
            data: [],
            borderWidth: 5,
            borderColor: 'rgba(77,15,253,0.85)',
            backgroundColor: 'transparent'
        }]
    }
});

function carTempUmi(){
    $.ajax({
        cache: false,
        method: "get",
        url: "/dashboard/leituras",
        success: function (data) {
            chartGraph.data.datasets[0].data = data.temp;
            chartGraph.data.datasets[1].data = data.umi;
            barChart.data.datasets[0].data = data.temp;
            barChart.data.datasets[1].data = data.umi;
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}


function carDados(){
    $.ajax({
        cache: false,
        method: "get",
        url: "/dashboard/leituras",
        success: function (data) {
            tempDois.textContent  = data.mediaTemp;
            umidade.textContent  = data.mediaUmi;
        },
        error: function (e) {
            console.log("Erro:", e);
        }
    });
}