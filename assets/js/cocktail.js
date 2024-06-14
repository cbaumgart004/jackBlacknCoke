const mixologistChoice = document.getElementById('surpriseMe')

const getSunsetTime = function () {
    const lattitude = 39.996064;
    const longitude =-105.090815; 
    const sunsetUrl = `https://api.sunrisesunset.io/json?lat=${lattitude}&lng=${longitude}&date=2024-06-13`;

    fetch(sunsetUrl)
        .then(function(response) {
            if (response.ok)  {
                console.log(response);
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            console.log(data)
        })
        .catch(function(error) {
            console.log(error)
            alert ('Unable to connect to Sunset API')
        });
};

mixologistChoice.addEventListener('click', getSunsetTime)