/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.
- TotalScore can be inputed by player on the board.
*/

var scores, roundscore, activePlayer, gamePlaying;
init();
var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
	
	if(gamePlaying) {
		//1. the random number is to be active when button is click
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		//2. the results should be displayed by the numbers on dice image through the No1 info
		 document.getElementById('dice-1').style.display = 'block';
		 document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';
		
		
		//3. update the round score if the rolled number was not a 1
		if (dice1 !== 1 && dice2 !== 1) {
			//add score
			roundscore += dice1 + dice2;   //same as roundscore = roundscore + dice
			document.querySelector('#current-' + activePlayer).textContent = roundscore;
		} else {
			//next player
			nextPlayer();
		}	
		/*if(dice === 6 && lastDice === 6) {
		//player loses score
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		nextPlayer();
		} else if (dice !== 1) {
			//add score
			roundscore += dice;   //same as roundscore = roundscore + dice
			document.querySelector('#current-' + activePlayer).textContent = roundscore;
		} else {
			//next player
			nextPlayer();
		}	
		
		lastDice = dice*/
	}
	
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		//.1 add current score to global score
		scores[activePlayer] += roundscore;  //same as score[activePlayer] = score[activePlayer] + roundscore;
		
		//.2update the user interface
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		//0.2 user setting the final score
		var input = document.querySelector('.final-score').value;
		//we create a condition statement all inputed value such as undefined'
		//0, null or '' are coered to false
		if(input) {
			var winningScore = input;
		} else {
			winningScore = 100;
		}
		
		//.3 check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			 document.getElementById('dice-1').style.display = 'none';
			 document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//nextPlayer
			nextPlayer();
		}
	}
		
});

//INPLEMENTING THE DO NOT REPEAT YOURSELF
function nextPlayer() {
	
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundscore = 0;
		
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		//to change bored for active player the property used here was toggle
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		
		//this also use but for reffrence and we did not archive 100%
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		
		
		//to hide dice if is the next players turn
		 document.getElementById('dice-1').style.display = 'none';
		 document.getElementById('dice-2').style.display = 'none';
		
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundscore = 0;
	activePlayer = 0;
	gamePlaying = true;
		
		//css in java script
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
		
	//setting our scores to '0' / getting html element by 'id'
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'player 1';
	document.getElementById('name-1').textContent = 'player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

//OUR LAST STEP TALKING ABOUT STATE VARIABLE.
//a state variable tells us the condition of a system.

//random rolling of dice
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
