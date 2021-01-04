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
    const response =  await fetch('/api', options)
    const post = await response.json()
    console.log(post)
    const postArray = Array.from(post)
    chart.data.labels = []
    chart.data.datasets[0].data = []
    postArray.forEach(post => {
        chart.data.labels.push(post.accel_x)
        chart.data.datasets[0].data.push(post.accel_y)
        //new mapboxgl.Marker().setLngLat([post.long, post.lat]).setPopup(popUp).addTo(map)
    })
    chart.update()
    let minCoords = minCoord.value.split(',')
    let maxCoords = maxCoord.value.split(',')
    let coords = [[parseFloat(minCoords[0]), parseFloat(minCoords[1])], [parseFloat(maxCoords[0]), parseFloat(maxCoords[1])]]
    map.setMaxBounds(coords)
    minCoord.value = ''; maxCoord.value = ''; speedRange.value = ''; accelRange.value = ''; interval.value = '';
})