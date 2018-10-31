//RECEBENDO USUÁRIO PARA CRIAÇÃO DO USUÁRIO NO BANCO DE DADOS

var ctx = document.getElementsByClassName("line-chart");
        var btx = document.getElementsByClassName("bar-chart");

        // O Gráfico trabalha com tres linhas
        // São os Types, Data, Options

        var arr = ["14", "40", "13", "12", "15", "12"];

        console.log(arr);

        // GRAPH EM BAR

        var barChart = new Chart(btx, {
            type: 'bar',
            data: {
                labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6"],
                datasets: [{
                    label: "Temperatura Média",
                    data: [
                        arr[0],
                        arr[1],
                        arr[2],
                        arr[3],
                        arr[4],
                        arr[5]
                    ],
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
                labels: ["20/05", "21/05", "22/05", "23/05", "24/05", "25/05"],
                datasets: [{
                    label: "TEMPERATURA",
                    data: [30, 23, 33, 32, 40, 45, 45],
                    borderWidth: 5,
                    borderColor: 'rgba(77,165,253,0.85)',
                    backgroundColor: 'transparent'
                },
                {
                    label: "UMIDADE",
                    data: [30, 23, 3, 32, 40, 45, 45],
                    borderWidth: 5,
                    borderColor: 'rgba(77,15,253,0.85)',
                    backgroundColor: 'transparent'
                }]
            },
            options: {
                title: {
                    display: true,
                    fontSize: 30,
                    text: 'MÁX e MIN',
                },
                labels: {
                    fontStyle: 'bold',
                },
                layout: {
                    margin: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 150
                    }
                }
            }
        });