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

window.addEventListener("load", function () {
  const loaderEl = this.document.querySelector(".pre-loader");
  const gridEl = document.querySelector("#grid");
  let cardChosen = []; // store cards chosen by players
  let cardChosenId = []; // store ids of cards
  let move = 0;
  let score = 0;

  // images.map((item) => console.log(item));
  Promise.all(
    cardArray.map((item) =>
      this.fetch(item.img)
        .then((response) => response.blob())
        .then(() => (loaderEl.style.display = "none"))
    )
  );

  createBoard();

  function createBoard() {
    cardArray.sort(() => 0.5 - Math.random()); //suffle the items in an array
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("data-id", i);
      // card.setAttribute("src", cardArray[i].img);
      // setTimeout(() => {
      //   loaderEl.style.display = "none";
      // }, 1000);
      card.setAttribute("class", "board-img");
      gridEl.append(card);
      card.addEventListener("click", flipCard);
      card.setAttribute("src", "images/hogwarts.png");
    }
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");

    cardChosen.push(cardArray[cardId].value);
    cardChosenId.push(cardId);

    /*  Prevent Duplicacy if same card is clicked again  */
    if (cardChosenId[0] === cardChosenId[1]) {
      cardChosenId.pop();
      cardChosen.pop();
    }
    // console.log(this);
    this.setAttribute("src", cardArray[cardId].img);
    // console.log(this);
    this.style.transition = "transform 0.2s";
    this.style.transform = "rotateY(-180deg)";

    if (cardChosen.length === 2) {
      const card = document.querySelectorAll("#grid img");
      Array.from(card).forEach((car) => (car.style.pointerEvents = "none"));
      setTimeout(checkMatch, 800);
      const moveEl = document.querySelector("#blocks h2");
      move++;
      moveEl.textContent = `Move: ${move}`;
    }
  }

  function checkMatch() {
    const cards = Array.from(document.querySelectorAll("#grid img"));
    cards.forEach((car) => (car.style.pointerEvents = "none"));
    if (cardChosen[0] === cardChosen[1]) {
      score += 1;
      cards[cardChosenId[0]].removeEventListener("click", flipCard);
      cards[cardChosenId[1]].removeEventListener("click", flipCard);
      cards[cardChosenId[0]].style.opacity = "0.6";
      cards[cardChosenId[1]].style.opacity = "0.6";
    } else {
      cards[cardChosenId[0]].style.transform = "rotateY(0deg)";
      cards[cardChosenId[1]].style.transform = "rotateY(0deg)";
      cards[cardChosenId[0]].setAttribute("src", "images/hogwarts.png");
      cards[cardChosenId[1]].setAttribute("src", "images/hogwarts.png");
    }
    if (score === 8) {
      gameOver();
    }
    cardChosen = [];
    cardChosenId = [];
    cards.forEach((car) => (car.style.pointerEvents = "auto"));
  }

  function gameOver() {
    const popupEl = document.querySelector(".popup");
    const message = document.querySelector(".popup p");
    const restartBtn = document.querySelector(".popup button");
    popupEl.classList.add("open");
    message.innerHTML = `You got <span style="font-weight:800">${move}</span> moves!`;

    restartBtn.addEventListener("click", () => {
      setTimeout(restart, 200);
    });
    move = 0;
  }

  function restart() {
    const cards = Array.from(document.querySelectorAll("#grid>img"));
    const popupEl = document.querySelector(".popup");
    cards.forEach((element) => {
      element.remove();
    });
    popupEl.classList.remove("open");
    cardChosen = [];
    cardChosenId = [];
    cards.forEach((car) => (car.style.pointerEvents = "auto"));
    move = 0;
    score = 0;
    const moveEl = document.querySelector("#blocks h2");
    moveEl.textContent = `Move: ${move}`;
    createBoard();
  }
});
