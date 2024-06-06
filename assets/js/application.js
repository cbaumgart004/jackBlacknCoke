//TODO: define variables from html
const playerShuffle = document.getElementById('shuffle');
const playerDraw = document.getElementById('draw');
const playerHit = document.getElementById('hit');
const playerStay = document.getElementById('stay');
const playerDoubleDown = document.getElementById('doubleDown');
const playerSplit = document.getElementById('split');


//TODO: On open fetch request Deck of Cards API with a "New" and shuffle
//tokens expire after 2 weeks, this ensures a new token is created on game start

//TODO: fetch request to draw a card.  We will create a "deal" function later

const shuffleCards = function () {
    const shuffleUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

    fetch(shuffleUrl)
        .then (function (response) {
            if (response.ok) {
                console.log(response);
                console.log(response.status);
            } else {
                alert(`Error: ${response.statusText}`);
            }
        })
        .catch(function(error) {
            alert (`Unable to connect to Deck of Cards API`);
        });
};









//TODO: Add event listener to buttons for gameplay
playerShuffle.addEventListener('click', shuffleCards);

playerDraw.addEventListener('click', function(){
    console.log('draw');
});

playerHit.addEventListener('click', function(){
    console.log('hit');
});

playerStay.addEventListener('click', function(){
    console.log('stay');
});

playerDoubleDown.addEventListener('click', function(){
    console.log('Double Down');
});

playerSplit.addEventListener('click', function(){
    console.log('split');
});