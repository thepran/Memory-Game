const cardArray = [
  {
    value: "draco",
    img: "images/draco.png",
  },
  {
    value: "hagrid",
    img: "images/hagrid.png",
  },
  {
    value: "harry",
    img: "images/harry-potter.png",
  },
  {
    value: "harry-sign",
    img: "images/harry-sign.png",
  },
  {
    value: "hermione",
    img: "images/hermione.png",
  },

  {
    value: "ron-weasley",
    img: "images/ron-weasley.png",
  },
  {
    value: "sorting-hat",
    img: "images/sorting-hat.png",
  },
  {
    value: "voldemort",
    img: "images/voldemort.png",
  },
  {
    value: "draco",
    img: "images/draco.png",
  },
  {
    value: "hagrid",
    img: "images/hagrid.png",
  },
  {
    value: "harry",
    img: "images/harry-potter.png",
  },
  {
    value: "harry-sign",
    img: "images/harry-sign.png",
  },
  {
    value: "hermione",
    img: "images/hermione.png",
  },

  {
    value: "ron-weasley",
    img: "images/ron-weasley.png",
  },
  {
    value: "sorting-hat",
    img: "images/sorting-hat.png",
  },
  {
    value: "voldemort",
    img: "images/voldemort.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridEl = document.querySelector("#grid");
let cardChosen = [];
let cardChosenId = [];
let move = 0;

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/hogwarts.png");
    card.setAttribute("data-id", i);
    card.setAttribute("class", "board-img");
    gridEl.append(card);
    card.addEventListener("click", flipCard);
  }
}
createBoard();
function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardId].value);
  cardChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  const card = document.querySelectorAll("#grid img");
  if (cardChosen.length === 2) {
    Array.from(card).forEach((car) => (car.style.pointerEvents = "none"));
    setTimeout(checkMatch, 500);
    move++;
  } else {
  }
}

function checkMatch() {
  const cards = Array.from(document.querySelectorAll("#grid img"));
  // console.log(cards);
  cards.forEach((car) => (car.style.pointerEvents = "none"));
  if (cardChosen[0] == cardChosen[1]) {
  } else {
    cards[cardChosenId[0]].setAttribute("src", "images/hogwarts.png");
    cards[cardChosenId[1]].setAttribute("src", "images/hogwarts.png");
  }
  cardChosen = [];
  cardChosenId = [];
  cards.forEach((car) => (car.style.pointerEvents = "auto"));
  // console.log(move);
}
