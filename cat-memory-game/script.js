const images = [
  'cat1.jpg',
  'cat2.jpg',
  'cat3.jpg',
  'cat4.jpg',
  'cat5.jpg',
  'cat6.jpg',
];

let cards = [];
let flipped = [];
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(img) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back" style="background-image: url('images/${img}')"></div>
    </div>
  `;
  card.dataset.image = img;
  card.addEventListener('click', handleCardClick);
  return card;
}

function setupBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const doubled = [...images, ...images];
  cards = shuffle(doubled).map(createCard);
  cards.forEach(card => board.appendChild(card));
  moves = 0;
  document.getElementById('moves').textContent = moves;
  flipped = [];
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || flipped.length === 2) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    document.getElementById('moves').textContent = moves;

    const [card1, card2] = flipped;
    if (card1.dataset.image === card2.dataset.image) {
      flipped = [];
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flipped = [];
      }, 1000);
    }
  }
}

function restartGame() {
  setupBoard();
}

setupBoard();
