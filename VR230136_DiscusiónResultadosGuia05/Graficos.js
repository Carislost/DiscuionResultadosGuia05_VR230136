let myChart;

document.getElementById('generate-chart').addEventListener('click', function() {
    const dataSelect = document.getElementById('data-select').value;
    const colorSelect = document.getElementById('color-select').value;
    const orientationSelect = document.getElementById('orientation-select').value;

    const data = getData(dataSelect);
    const orientation = orientationSelect === 'vertical' ? 'v' : 'h';

    createChart(orientation, data, colorSelect);
});

document.getElementById('clear-chart').addEventListener('click', function() {
    if (myChart) {
        Plotly.purge('myChart');
        myChart = null;
    }

    // Resetear los valores de los selectores
    document.getElementById('data-select').value = 'navegador';
    document.getElementById('color-select').value = 'red';
    document.getElementById('orientation-select').value = 'vertical';
});

function createChart(orientation, data, color) {
    const trace = {
        x: orientation === 'v' ? data.labels : data.values,
        y: orientation === 'v' ? data.values : data.labels,
        type: 'bar',
        orientation: orientation,
        marker: {
            color: color
        }
    };

    const layout = {
        title: data.label
    };

    const config = {
        displayModeBar: false
    };

    myChart = Plotly.newPlot('myChart', [trace], layout, config);
}


function getData(selection) {
    const data = {
        navegador: {
            label: 'Uso de Navegador',
            labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
            values: [65, 30, 20, 10, 5]
        },
        sistema_operativo: {
            label: 'Uso de Sistema Operativo',
            labels: ['Windows', 'MacOS', 'Linux', 'Android', 'iOS'],
            values: [50, 30, 10, 5, 5]
        }
    };

    return data[selection];
}
