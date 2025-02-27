let cards = document.querySelectorAll(".card");
let button = document.querySelector(".sub-title button");
let index = 0; // To track which card to hide next

function rotateCards() {
  let angle = 0;
  cards.forEach((card, i) => {
    if (card.classList.contains("away")) {
      card.style.transform = `translateY(-120vh) rotate(-48deg)`;
    } else {
      card.style.transform = `rotate(${angle}deg)`;
      angle -= 15;
      card.style.zIndex = cards.length - i;
    }
  });
}

rotateCards();

button.addEventListener("click", () => {
  if (index < cards.length) {
    cards[index].classList.add("away");
    rotateCards();
    index++; 
  }
});