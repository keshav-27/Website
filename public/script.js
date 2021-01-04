mapboxgl.accessToken = 'pk.eyJ1Ijoia2VzaGF2LTIwMTkiLCJhIjoiY2tqNnZiaHAyMTg4dTJxbnZwMXBqaGIwciJ9.SlyK56DwZ7RF6mYSD9t8mQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80, 10],
            maxBounds: [[60, 7], [90, 40]]
        });
        var popUp = new mapboxgl.Popup().setHTML("<p>VehicleID</p>")

        const ctx = document.getElementById('chart').getContext('2d');
        let chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: [],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false
            }]
        }
});

const submit = document.getElementById('submit')
let minCoord = document.getElementById('minLocation')
let maxCoord = document.getElementById('maxLocation')
let speedRange = document.getElementById('speed')
let accelRange = document.getElementById('accel')
let interval = document.getElementById('interval')

submit.addEventListener('click', async (e) => {
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            speedRqst: speedRange.value.split(','),
            intervalRqst: interval.value.split(','),
            accelRqst: accelRange.value.split(','),
            locationRqst: [minCoord.value.split(','), maxCoord.value.split(',')]   
        })
    }
    const response = await fetch('/api', options)
    const post = await response.json()
    console.log(post)
    const postArray = Array.from(post)
    let plotData = []
    postArray.forEach(post => {
        chart.data.labels.push(post.accel_x)
        plotData.push(post.accel_y)
    })
    chart.data.datasets.data = plotData
    chart.update()
    console.log(chart.data.datasets.data)
    let minCoords = minCoord.value.split(',')
    let maxCoords = maxCoord.value.split(',')
    let coords = [[parseFloat(minCoords[0]), parseFloat(minCoords[1])], [parseFloat(maxCoords[0]), parseFloat(maxCoords[1])]]
    map.setMaxBounds(coords)
    new mapboxgl.Marker().setLngLat([80, 15]).setPopup(popUp).addTo(map)
    minCoord.value = ''
    maxCoord.value = ''
    console.log(coords)
})