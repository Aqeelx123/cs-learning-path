
document.addEventListener("DOMContentLoaded", function () {
    let videoCards = document.querySelectorAll(".video-card"); 
    let loadMoreBtn = document.querySelector(".load-more"); 
    let cardsPerLoad = 8; 
    let currentlyVisible = 8; 

 
    videoCards.forEach((card, index) => {
        if (index >= currentlyVisible) {
            card.style.display = "none";
        }
    });


    loadMoreBtn.addEventListener("click", function () {
        let totalCards = videoCards.length;
        let newVisibleCount = currentlyVisible + cardsPerLoad; 

        videoCards.forEach((card, index) => {
            if (index < newVisibleCount) {
                card.style.display = "flex"; 
            }
        });

        currentlyVisible = newVisibleCount; 


        if (currentlyVisible >= totalCards) {
            loadMoreBtn.style.display = "none";
        }
    });
});

