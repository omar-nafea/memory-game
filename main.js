//card options
const cardArray = [{
        name: "coffee",
        img: "images/A_small_cup_of_coffee.JPG",
    },
    {
        name: "cheese",
        img: "images/cheese.jpg",
    },
    {
        name: "chocolate",
        img: "images/Chocolate Cake.jpg",
    },
    {
        name: "lemonade",
        img: "images/honey-lemonade-2-650x975.jpg",
    },
    {
        name: "hotdog",
        img: "images/perfect-hot-dog.jpg.optimal.jpg",
    },
    {
        name: "lolipop",
        img: "images/GirlWithLollipop.jpg",
    },
    {
        name: "coffee",
        img: "images/A_small_cup_of_coffee.JPG",
    },
    {
        name: "cheese",
        img: "images/cheese.jpg",
    },
    {
        name: "chocolate",
        img: "images/Chocolate Cake.jpg",
    },
    {
        name: "lemonade",
        img: "images/honey-lemonade-2-650x975.jpg",
    },
    {
        name: "hotdog",
        img: "images/perfect-hot-dog.jpg.optimal.jpg",
    },
    {
        name: "lolipop",
        img: "images/GirlWithLollipop.jpg",
    },
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createCards() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "images/blank.png");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.append(card);
    }
}
var win = document.getElementById("winning");

function playAudio() {
    win.play();
}

const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
        closeModal(modal);
    });
});

closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function checkForCards() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute("src", "images/blank.png");
        cards[optionTwoId].setAttribute("src", "images/blank.png");
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute("src", "images/white.png");
        cards[optionTwoId].setAttribute("src", "images/white.png");
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute("src", "images/blank.png");
        cards[optionTwoId].setAttribute("src", "images/blank.png");
    }
    cardsChosen = [];
    cardsChosenId = [];

    function refresh() {
        document.location.reload();
    }
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
        openModal(modal);
        playAudio();
        setTimeout(refresh, 2000);
    }
}

function flipCard() {
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    this.setAttribute("width", "100px");
    this.setAttribute("height", "100px");
    if (cardsChosen.length === 2) {
        setTimeout(checkForCards, 400);
    }
}

createCards();