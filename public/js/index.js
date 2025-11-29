const mask = document.getElementById("mask");
const list = document.getElementById("song-list");

const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

function getCardWidth() {
    const firstCard = list.querySelector("li");
    if (!firstCard) return 0;

    const cardWidth = firstCard.offsetWidth;

    const style = window.getComputedStyle(list);
    const gap =
        parseFloat(style.columnGap || style.gap || 0) || 0;

    return cardWidth + gap;
}

function updateMask() {
    const sc = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    if (list.scrollWidth <= list.clientWidth) {
        mask.className = "";
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
        return;
    }

    if (sc <= 10) {
        mask.className = "fade-right";
        btnLeft.style.display = "none";
        btnRight.style.display = "inline-block";
    }
    else if (sc > 10 && sc < maxScroll - 10) {
        mask.className = "fade-both";
        btnLeft.style.display = "inline-block";
        btnRight.style.display = "inline-block";
    }
    else {
        mask.className = "fade-left";
        btnLeft.style.display = "inline-block";
        btnRight.style.display = "none";
    }
}

updateMask();
list.addEventListener("scroll", updateMask);
window.addEventListener("resize", updateMask);

let isScrolling = false;

function smoothScroll(amount) {
    if (isScrolling) return;
    isScrolling = true;

    list.scrollTo({
        left: list.scrollLeft + amount,
        behavior: "smooth"
    });

    setTimeout(() => (isScrolling = false), 350);
}

btnLeft.addEventListener("click", () => {
    const amount = getCardWidth() * Math.floor(list.clientWidth / getCardWidth());
    smoothScroll(-amount);
});

btnRight.addEventListener("click", () => {
    const amount = getCardWidth() * Math.floor(list.clientWidth / getCardWidth());
    smoothScroll(amount);
});
