const choices = ['rock', 'paper', 'scissors'];

const choiceButtons = document.querySelectorAll('.choice');
const choicesSection = document.querySelector('.choices');
const resultSection = document.getElementById('result');
const userPickedDiv = document.getElementById('user-picked');
const computerPickedDiv = document.getElementById('computer-picked');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');
const scoreValue = document.getElementById('score');

const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('modal-backdrop');

let score = Number(localStorage.getItem('rps-score')) || 0;
scoreValue.textContent = score;

const winMap ={
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
};


function getComputerChoice() {
    const idx = Math.floor(Math.random() * choices.length);
    return choices[idx];
}

function getResult(user, computer) {
    if (user === computer) return 'draw';
    if (winMap[user] === computer) return 'win'; 
    return 'lose';
}

  function renderPicked(div, choice) {
    div.className = `picked picked--${choice}`;
    div.innerHTML = `
      <img src="images/icon-${choice}.svg" alt="${choice.charAt(0).toUpperCase() + choice.slice(1)}" />
    `;
  }

  function showResultStep(userChoice, computerChoice, result) {
    renderPicked(userPickedDiv, userChoice);
    renderPicked(computerPickedDiv, computerChoice);
  
    resultMessage.textContent =
      result === 'win' ? 'You Win'
      : result === 'lose' ? 'You Lose'
      : 'Draw';
  
    resultSection.classList.add('active');
    resultSection.removeAttribute('hidden');
    choicesSection.style.display = 'none';
    playAgainBtn.removeAttribute('hidden'); 
  }
  
  function showStep2(userChoice) {
    renderPicked(userPickedDiv, userChoice);
    
    computerPickedDiv.className = '';
    computerPickedDiv.innerHTML = `<div class="picked--placeholder"></div>`;
    resultMessage.textContent = '';
    resultSection.classList.add('active');
    resultSection.removeAttribute('hidden');
    choicesSection.style.display = 'none';
    playAgainBtn.setAttribute('hidden', 'true'); 
}
  
  function resetGame() {
    resultSection.classList.remove('active');
    resultSection.setAttribute('hidden', 'true');
    choicesSection.style.display = '';
    playAgainBtn.setAttribute('hidden', 'true'); 
  }
  
  function updateScore(result) {
    if (result === 'win') score++;
    else if (result === 'lose' && score > 0) score--;
    scoreValue.textContent = score;
    localStorage.setItem('rps-score', score);
  }


  choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const userChoice = btn.dataset.choice;
      const computerChoice = getComputerChoice();
      const result = getResult(userChoice, computerChoice);

      showStep2(userChoice);

      setTimeout(() => {
        showResultStep(userChoice, computerChoice, result);
        updateScore(result);
    }, 1200);
  });
});

playAgainBtn.addEventListener('click', resetGame);

rulesBtn.addEventListener('click', () => {
    rulesModal.removeAttribute('hidden');
    modalBackdrop.removeAttribute('hidden');
  });
  closeModalBtn.addEventListener('click', () => {
    rulesModal.setAttribute('hidden', 'true');
    modalBackdrop.setAttribute('hidden', 'true');
  });
  modalBackdrop.addEventListener('click', () => {
    rulesModal.setAttribute('hidden', 'true');
    modalBackdrop.setAttribute('hidden', 'true');
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !rulesModal.hasAttribute('hidden')) {
      rulesModal.setAttribute('hidden', 'true');
      modalBackdrop.setAttribute('hidden', 'true');
    }
  });