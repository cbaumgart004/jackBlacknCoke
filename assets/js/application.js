//elements from html
const playerShuffle1 = document.getElementById('shuffle');
const playerDeal = document.getElementById('deal');
const playerHit = document.getElementById('hit');
const playerStay = document.getElementById('stay');
const playerDoubleDown = document.getElementById('doubleDown');
const playerSplit = document.getElementById('split');
const playerClear = document.getElementById('clear');
const gameTable = document.getElementById('gameTable');
const dayNight = document.getElementById('dayRender');
const dayNightImage = document.getElementById('dayRenderImage');
const playerWin = document.getElementById('win');
const playerLose = document.getElementById('lose');
const playerPush = document.getElementById('pushNotification');
const playerBlackJack = document.getElementById('blackJackNotification');
//variables for cards to render to html
const showDealerCards = document.getElementById('dealerCards');
const showPlayerCards = document.getElementById('playerCards');
const cardsRemaining = localStorage.getItem('cardsRemaining')||'';
const dayNightButton = document.getElementById('getDayNight');

let sunriseString = localStorage.getItem('sunriseString')||'';
let sunsetString = localStorage.getItem('sunsetString')||'';
//initialize variables for gameplay
let splitCount = localStorage.getItem('localStorage');
if (!splitCount) {
    splitCount = localStorage.setItem('splitCount', 0);
}
let deckId = localStorage.getItem('deckId');
let playerCards = JSON.parse(localStorage.getItem('playerCards'))||[];
//console.log(playerCards[0].code, playerCards[1].code);
let dealerCards = JSON.parse(localStorage.getItem('dealerCards'))||[];
console.log(`page open dealer cards: ${dealerCards}` )

// On open fetch request Deck of Cards API with a "New" and shuffle
//tokens expire after 2 weeks, this ensures a new token is created on game start
const apiCards = document.querySelectorAll('.api-card');
//TODO: fetch request to draw a card.  We will create a "deal" function later

apiCards.forEach(card => {
    // Add a CSS class
    card.classList.add('card-back');
    // Alternatively, you can directly apply styles
    card.style.backgroundImage = "url('../assets/images/cardback.png')";
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.borderRadius = "15px";
});
//shuffle the deck function from deck of cards API
const shuffleCards = function () {
    playerShuffle1.style.display = 'none';
    playerDeal.style.display = 'inline';
    localStorage.getItem('deckId', 'deckId')
    let shuffleUrl;
    if (!deckId) {
    shuffleUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=7`;
} else {
    shuffleUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=7`;
};
    fetch(shuffleUrl)
        .then (function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            console.log(data);
            console.log(data.remaining);
            deckId = data.deck_id;
            console.log(deckId);
            localStorage.setItem('cardsRemaining', data.remaining);
            localStorage.setItem('deckId', deckId);
        })
        .catch(function(error) {
            console.log(error);
            alert (`Unable to connect to Deck of Cards API`);
        });
};
console.log(deckId);

//deal the initial cards
const dealCards = function() {
    playerDeal.style.display = 'none';
    playerHit.style.display = 'inline';
    playerStay.style.display = 'inline';
    playerDoubleDown.style.display = 'inline';
    const dealDealerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    const dealPlayerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    //I really need to use arrow function syntax more.
    const dealCard = (url, cardsArray, handFunction) => {
        fetch(url)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            })
            .then(function(data) {
                for (let i = 0; i < 2; i++) {
                    cardsArray[i] = data.cards[i];
                }
                handFunction(data);
            })
            .catch(function(error) {
                console.error(error);
                alert(`Unable to connect to Deck of Cards API`);
            });
    };
    //run this function twice, once for dealer, once for player
    dealCard(dealDealerUrl, dealerCards, dealerHand);
    dealCard(dealPlayerUrl, playerCards, playerHand);
};
//pass all cards through to give them numeric values
const calculateCardValue = function(card) {
    if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
        return 10;
    } else if (card.value === "ACE") {
        return 11;
    } else {
        return parseInt(card.value);
    }
};

const calculateTotalAndSave = function(cards, totalKey) {
    let total = 0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].value = calculateCardValue(cards[i]);
        total += cards[i].value;
    }

    localStorage.setItem(totalKey, total);
    localStorage.setItem(totalKey.replace('Total', 'Cards'), JSON.stringify(cards));
    //console.log(`calculateTotalandSave ${dealerTotal}`)
    return total;
};

const dealerHand = function(data) {
    let dealerTotal = calculateTotalAndSave(dealerCards, 'dealerTotal');
    let playerTotal = localStorage.getItem('playerTotal');
    if (dealerCards[0].state !== 'faceUp') {
        dealerCards[0].state = 'faceDown';
    console.log(`dealerHand calculated total ${dealerTotal}`);
    }
    //only call a blackjack on deal
    if (dealerTotal === 21 && dealerCards.length === 2) {
        if (dealerTotal > playerTotal) {
            
            playerLose.style.display ='inline';
        } else {
            playerPush.style.display = 'inline';
        }
    }
    console.log(`Dealer Shows ${dealerTotal}`);
    //only hit more cards after Player presses Stay button
    
    
    renderDealerCards();
};

const playerHand = function(data) {
    let playerTotal = calculateTotalAndSave(playerCards, 'playerTotal');
    //only call blackjack on deal
    if (playerTotal === 21 && playerCards.size === 2) {
        playerBlackJack.style.display = 'inline';
    }
    
    console.log(`Player Shows ${playerTotal}`);
    renderPlayerCards();
    checkForBust(playerTotal);
};
//render cards function reduces repeated code
const renderCards = function(cards, container, cardType) {
    for (let i = 0; i < cards.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('id', `${cardType}Card${i}`);
        
        if (cardType === 'dealer' && i === 0 && cards[0].state === 'faceDown') {
            img.src = 'https://www.deckofcardsapi.com/static/img/back.png';
        } else {
            img.src = cards[i].image;
        }
        
        img.alt = `This card is ${cards[i].code}`;
        img.classList.add('card');
        
        // Check if the card is already displayed
        if (!document.getElementById(`${cardType}Card${i}`)) {
            container.appendChild(img);
        } else {
            const existingImg = document.getElementById(`${cardType}Card${i}`);
            existingImg.src = img.src; // Update the src attribute for face-up cards
        }
    }
};

const renderPlayerCards = function() {
    renderCards(playerCards, showPlayerCards, 'player');
};

const renderDealerCards = function() {
    renderCards(dealerCards, showDealerCards, 'dealer');
};

const hitCard = function (playerType) {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            alert(`Error: ${response.statusText}`);
        }
    }).then(function (data) {
        console.log(data.cards);
        if (playerType === 'player') {
            playerCards.push(data.cards[0]);
            localStorage.setItem('playerCards', JSON.stringify(playerCards));
            console.log(`player has ${playerCards.length} cards`);
            console.log(`player cards: ${playerCards}`);
            playerHand(data);
        } else if (playerType === 'dealer') {
            dealerCards.push(data.cards[0]);
            localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
            
            dealerHand(data);
            updateDealerTotal(); // Update dealerTotal after each new card is drawn
        }
    })
    .catch(function (error) {
        console.log(error);
        alert(`Unable to connect to Deck of Cards API`);
    });
};

const updateDealerTotal = function() {
    let dealerTotal = calculateTotalAndSave(dealerCards, 'dealerTotal');
    console.log(`Updated Dealer Shows ${dealerTotal}`);
    
    console.log(`updateDealer Total: dealer has ${dealerCards.length} cards`)
    if (dealerTotal < 17) {
        hitCard('dealer');
    }
    if (dealerTotal>21) {
        dealerTotal = 0;
        for (let i = 0; i < dealerCards.length; i++) {
            if (dealerCards[i].value === 11) {
                dealerCards[i].value = 1;
                console.log(`Ace at index ${i} is now worth 1`);
            }
            dealerTotal += dealerCards[i].value
        }
        console.log(`With Aces dealer Total: ${dealerTotal}`)
        dealerTotal = localStorage.setItem('dealerTotal', dealerTotal);
        console.log(dealerTotal<17);
        if (dealerTotal < 17) {
            hitCard ('dealer');
        } else {
            playerWin.style.display = 'block';
        }
    }
    if (dealerTotal>= 17) {
        checkForWin();
    }
    renderDealerCards();
    
}; 

const checkForBust = function(playerTotal) {
    if (playerTotal > 21) {
        playerTotal = 0;
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i].value === 11) {
                playerCards[i].value = 1;
            }
            playerTotal += playerCards[i].value
        }
        localStorage.setItem('playerTotal', playerTotal);
        console.log(playerTotal);
        if(playerTotal > 21) {
            playerLose.style.display = 'inline';
        }
        
    }
};


const checkForWin = function () {
    let playerTotal = parseInt(localStorage.getItem('playerTotal'));
    let dealerTotal = parseInt(localStorage.getItem('dealerTotal', 'dealerTotal'));
    if (playerTotal > dealerTotal) {
        playerWin.style.display = 'inline';
    } else if (playerTotal === dealerTotal) {
        playerPush.style.display = 'inline';
    } else {
        playerLose.style.display = 'inline';
    };

    playerHit.style.display = 'none';
    playerStay.style.display = 'none';
    playerDoubleDown.style.display = 'none';
    playerClear.style.display = 'inline';
};
const tableClear = function () {
    dealerCards = [];
    playerCards = [];
    localStorage.setItem('playerCards', JSON.stringify(playerCards));
    localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
    showPlayerCards.innerHTML = ''; // Clear previous cards
    showDealerCards.innerHTML = '';
    bannerClear();
    playerDeal.style.display = 'inline';
    playerClear.style.display = 'none';
};

const bannerClear = function() {
    playerWin.style.display = 'none';
    playerLose.style.display = 'none';
    playerPush.style.display = 'none';
    playerBlackJack.style.display = 'none';
};
//clear banners on page open
bannerClear();
//clear player cards on open
tableClear();
//I need to call player stay function if player clicks "double down" so there's a separate function that can be called by either event listener
const playerStayLogic = function () {

    playerButtonClear();
    playerClear.style.display = 'inline';
 //set player state to 'stay' so dealer will take more cards
    
    dealerCards[0].state = 'faceUp';
    renderDealerCards();
    let dealerTotal = parseInt(localStorage.getItem('dealerTotal', 'dealerTotal'));

    if (dealerTotal >= 17) {
    console.log (`dealer stays`);
    checkForWin();
    return
    } else {
    hitCard('dealer');
    dealerTotal = parseInt(localStorage.getItem('dealerTotal', 'dealerTotal'));
    console.log(`after hit card dealer total ${dealerTotal}`)
};
    
};
//Split Functions
//Split PlayerHand
const splitArray = function () {

};
//for the dayNight function
const getSunsetTime = function () {
    //Lattitude and Longitude for Denver (approximate)
    const lattitude = 39.996064;
    const longitude =-105.090815; 
    //use today as a parameter for fetch request
    const today = dayjs().format('YYYY-MM-DD')
    const sunsetUrl = `https://api.sunrisesunset.io/json?lat=${lattitude}&lng=${longitude}&date=${today}`;

    fetch(sunsetUrl)
        .then(function(response) {
            if (response.ok)  {
                console.log(response);
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            console.log(data);
            console.log(data.results.sunset);
            sunriseString = localStorage.setItem('sunriseString', data.results.sunrise);
            sunsetString = localStorage.setItem('sunsetString', data.results.sunset);
            console.log(sunsetString);
            parseDayNight();
        })
        .catch(function(error) {
            console.log(error);
            alert ('Unable to connect to Sunset API');
        });

};

const parseDayNight = function() {
    let time = dayjs().format('HH:mm:ss')
    //Ugh.  Dayjs 1000% IS NOT creating a dayjs in the code below.  Time to go old school
    //let sunsetTime = '8:32:00 PM';
    //let sunsetTime24Hour = dayjs(sunsetTime, 'h:mm:ss A').format('HH:mm:ss');
    //console.log(sunsetTime24Hour);
//take data values
sunriseString = localStorage.getItem('sunriseString');
console.log(sunriseString);
sunsetString = localStorage.getItem('sunsetString');
//split sthe strings into arrays at : and space
let sunriseArray = sunriseString.split(/:| /);
//define variables to use below for readability
let srHour = parseInt(sunriseArray[0]);
let srMin = parseInt(sunriseArray[1]);
let srSec = parseInt(sunriseArray[2]);
//sunset
let sunsetArray = sunsetString.split(/:| /);
//add 12 to sunset.  We're assuming sunset always happens after noon
let ssHour = (parseInt(sunsetArray[0]) + 12);
let ssMin = parseInt(sunsetArray[1]);
let ssSec = parseInt(sunsetArray[2]);

//turn results into Dayjs objects the hard way
let todaySunrise = dayjs().set('hour', srHour).set('minute', srMin).set('second', srSec).format('HH:mm:ss');
let todaySunset = dayjs().set('hour', ssHour).set('minute', ssMin).set('second', ssSec).format('HH:mm:ss');
console.log(todaySunrise);
console.log(time);
console.log(todaySunset);
console.log(time> todaySunrise)
console.log(time<todaySunset);
//set day or night image in html
if (time>todaySunrise && time <todaySunset) {
    dayNightImage.src="./assets/images/Day.jpg";
    console.log (`daytime`)
} else {
    console.log (`night time`)
    dayNightImage.src="./assets/images/Night.jpg";
};

};
const isNow = function (){
    let displayTime = dayjs().format('h:mm A')
    dayNight.textContent = displayTime
};
getSunsetTime();
isNow();
//call this function every second
setInterval(() => {
    // Call the isNow function here
    isNow();
    
}, 1000); //every second
//check for sunset every 10 minutes
setInterval(() => {
    // Call the isNow function here
    getSunsetTime();
    
}, 600000); // 600000 milliseconds = 10 minutes

//clear irrelevant buttons on page open
const playerButtonClear = function(){
playerDeal.style.display = 'none';
playerHit.style.display = 'none';
playerStay.style.display = 'none';
playerDoubleDown.style.display = 'none';
playerSplit.style.display = 'none';
playerClear.style.display = 'none';
};
playerButtonClear();
//Add event listener to buttons for gameplay
playerShuffle1.addEventListener('click', shuffleCards);

playerDeal.addEventListener('click', dealCards);

playerHit.addEventListener('click', function () {
    hitCard('player');
});

playerStay.addEventListener('click', playerStayLogic);

playerDoubleDown.addEventListener('click', function(){
    console.log('Double Down');
    hitCard('player');
    playerStayLogic();
});

playerSplit.addEventListener('click', function(){
    console.log('split');
    splitCount = localStorage.getItem('splitCount');
    console.log(splitCount);
});

playerClear.addEventListener('click', tableClear);


