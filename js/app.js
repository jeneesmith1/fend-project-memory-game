/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


//get all the cards in an array 
var cards = [
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
]

//create global variables for the cards

var moves = 0;
var date = new Date();

var moveCounter = document.querySelector('.moves');

var timeCounter = 0;


//create a function that adds the time, then updates it every second, then refreshes
//I need to remove the existing time


	var runningTimer = setInterval(countTime, 1000)
		 function countTime() {
		   timeCounter += 1;
           timeText = `${timeCounter}`
           create(timeText);	
		}	
	


function generateCard(card) {
	return `<li class = "card" data-card="${card}"><i class = "fa ${card}"></i></li>`

}

function initGame() {
	shuffle(cards);
	var deck = document.querySelector('.deck');
	var cardHTML = cards.map(function(card){
		return generateCard(card);
	});

	deck.innerHTML = cardHTML.join('');

	// create span in index 
	var scorepanel = document.querySelector('.score-panel');
	var timer = document.createElement('span');
	timer.id = "timer"
	timer.classList.add("timer");
	timer.innerText = "00:00";

	scorepanel.appendChild(timer)
	moveCounter.innerHTML = moves;
	
}


initGame();

function create(timeText) {

	// goal: updates page to reflect current timer by replacing old time with new time

	// get timer currently on page 

	var currentTime = document.getElementById("timer");

	// format date "MM:SS"

	var date = new Date((timeText) * 1000)

	function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
	}

	var minutes = addZero(date.getMinutes());
	var seconds = addZero(date.getSeconds());

	var formattedDate = minutes + ":" + seconds

	// add new date to timer

	currentTime.innerText = formattedDate;

	
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    console.log("Shuffling")

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//get all the cards on the page
var allCards = document.querySelectorAll('.card');
var openCards = [];
var stars = document.querySelectorAll('.fa fa-star');
//get a query selector that looks at the number of cards with match open

var score = 0;


//this was how we created an event listener for the cards. For every card that is clicked,
//either set it to be open or set it to be closed.

allCards.forEach(function(card) {
 card.addEventListener('click', function(e) {
   cardBehavior(card)

});

});


function cardBehavior(card) {


  console.log("Card Behavior Run")
  
if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
  openCards.push(card);
  card.classList.add('open', 'show');
  var firstCardType = openCards[0].dataset.card;

  //add moves to move counter
   	    moves += 1;
        moveCounter.innerHTML = moves;
        finalStars = 3;



		if (moves == 42) {
			console.log("2 stars")
			var star1 = document.querySelectorAll('i.fa-star');
			star1[0].remove('fa-star');
			finalStars = 2;
		}
		if (moves == 60){
			console.log("1 stars")
			var star2 = document.querySelectorAll('i.fa-star');
			star2[0].remove('fa-star');
			finalStars = 1;
		}


//save the cards in this variable so they can be matched against each other
//if you have more than two cards open, hide a card
  if (openCards.length == 2) {

  	//check and see if they match

  	if (openCards[0].dataset.card == openCards[1].dataset.card) {
  		openCards[0].classList.add('match');
  		openCards[0].classList.add('open');
  		openCards[0].classList.add('show');

  		openCards[1].classList.add('match');
  		openCards[1].classList.add('open');
  		openCards[1].classList.add('show');

  	    openCards = [];
  	    score += 1;

  	    if (score == 8) {
	    console.log("YOU WIN BB")
	    clearInterval(runningTimer)
	    winningTime = document.getElementById('timer').innerText
	    //var winningTime = finalTime.innerText
	    console.log("winningTime is %s", winningTime)




  	    var modal = document.querySelector('.modal')
  	    var modal_content = document.querySelector('.modal-content')
  	    modal_content.innerHTML = `<span class="close">&times;</span> <span> You won! Final Time: ${winningTime}  To play again, close this and hit restart. Score: </span>`
  	    	for (var x = 0; x < finalStars; x++) {
				var bullet = document.createElement('span');
				var prettyStars = document.createElement('i');
				prettyStars.classList.add("fa")
				prettyStars.classList.add("fa-star")
				bullet.appendChild(prettyStars)
				modal_content.appendChild(bullet)
				}
  	    
	    modal.style.display = "block";

	    // function for end game modal goes here

	    var modal_content = document.querySelector('.close')


			if (modal_content) {
				modal_content.addEventListener("click", function(e) {
				console.log("Modal Clicked on")
  				var modal = document.querySelector('.modal')
    			modal.style.display = "none";

				})

}
		}
  	}
  		// put the hide function here
  		setTimeout(function() {
  			openCards.forEach(function(card){
  				card.classList.remove('open', 'show')
  			})

  			openCards = [];
  		}, 675);


  }               
}; 

}





//find the restart button. 

var restartButton = document.querySelector('.fa-repeat');


restartButton.addEventListener("click", function(e) {
	console.log("Restart worked properly")
	console.log(e)
     
    e.stopPropagation();
	//reset moves
	moves = 0;

	//set star rating back to 3

	//count how many stars 
	var starPanel = document.querySelector('.stars')
	starPanel.innerHTML = '';

	for (var x = 0; x < 3; x++) {
		var bullet = document.createElement('li');
		var prettyStars = document.createElement('i');
		prettyStars.classList.add("fa")
		prettyStars.classList.add("fa-star")
		bullet.appendChild(prettyStars)
		starPanel.appendChild(bullet)
	}


	//set timer back to 0

	var scorepanel = document.querySelector('.score-panel');
    var currentTime = document.getElementById("timer");
    scorepanel.removeChild(timer)

    initGame()


    var allCardy = document.querySelectorAll('.card');
    allCardy.forEach(function(card) {
    	card.addEventListener('click', function(e) {
          console.log("NEW CARD LISTENER")
          cardBehavior(card)
    	})

    })




    console.log("Restart Init Happened")
    
	var resetTime = document.getElementById("timer");
    var formattedReset = "00:00"
    timeCounter = 0;
	resetTime.innerText = formattedReset;
	setInterval(countTime, 1000)


})


//when the game finishes, need to create a modal and add it to the DOM

//how to create a score

// you need to keep track of how many moves the player has made

//need to keep track of how many matches there are, so can determine how they are doing

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
