chartIt();

async function chartIt() {

    const apiData = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    window.chartData = {
        labels: apiData.xlabel,
        datasets: [{
                label: 'Temperature',
                data: apiData.ytemps,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: "#8e5ea2",
                borderWidth: 1
            },
            {
                label: 'Humidity',
                data: apiData.yhumid,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: "#3cba9f",
                borderWidth: 1

            }
        ]
    }

    const options = {
        animation: false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride: true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: 10,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 10,
        //Number - The scale starting value
        scaleStartValue: 0,
        title: {
            display: true,
            text: 'Humidity and temperature data from DHT11'
        }
    };

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options
    });

}

setInterval(updateData, 5000);



async function getData() {
    const xlabel = [];
    const ytemps = [];
    const yhumid = [];
    const response = await fetch('http://192.168.0.105:5000/api/v1/data/20');
    const data = await response.json();
    data.data.reverse().forEach(obj => {
        xlabel.push(obj.time.split(' ').slice(1, 5).join(' '));
        ytemps.push(obj.temperature)
        yhumid.push(obj.humidity)
    });
    return {
        xlabel,
        ytemps,
        yhumid
    };
}

async function getLastData() {
    const response = await fetch('http://192.168.0.105:5000/api/v1/get_last_values/');
    const data = await response.json();
    return data.data;

}

async function updateData() {
    const lastData = await getLastData();

    const lstTime = lastData.time.split(' ').slice(1, 5).join(' ');
    const lstTemp = lastData.temperature;
    const lstHumid = lastData.humidity;
    checkLength(chartData.datasets[0].data, lstTemp);
    checkLength(chartData.datasets[1].data, lstHumid);
    checkLength(chartData.labels, lstTime);

    myChart.update();

}

function checkLength(data, value) {
    if (data.length > 20) {
        data.shift()
    }
    data.push(value);
}