'use strict';
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceel = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  diceel.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

//rollinng dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //rolling funtionality
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    if (dice != 1) {
      // too add dice to current score
      currentScore = currentScore + dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceel.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
