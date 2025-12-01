const masks = Array.from(document.getElementsByClassName("mask"));
const lists = Array.from(document.getElementsByClassName("song-list"));
const leftBtns = Array.from(document.getElementsByClassName("btn-left"));
const rightBtns = Array.from(document.getElementsByClassName("btn-right"));
const loginBtn = document.getElementById("login");

masks.forEach((mask, index) => {
    const list = lists[index];
    const btnLeft = leftBtns[index];
    const btnRight = rightBtns[index];

    function getCardWidth() {
        const firstCard = list.querySelector("li");
        if (!firstCard) return 0;

        const cardWidth = firstCard.offsetWidth;
        const style = window.getComputedStyle(list);
        const gap = parseFloat(style.columnGap || style.gap || 0) || 0;

        return cardWidth + gap;
    }

    function updateMask() {
        const sc = list.scrollLeft;
        const maxScroll = list.scrollWidth - list.clientWidth;

        if (list.scrollWidth <= list.clientWidth) {
            mask.className = "mask";
            btnLeft.style.display = "none";
            btnRight.style.display = "none";
            return;
        }

        if (sc <= 10) {
            mask.className = "mask fade-right";
            btnLeft.style.display = "none";
            btnRight.style.display = "inline-block";
        }
        else if (sc > 10 && sc < maxScroll - 10) {
            mask.className = "mask fade-both";
            btnLeft.style.display = "inline-block";
            btnRight.style.display = "inline-block";
        }
        else {
            mask.className = "mask fade-left";
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
});

loginBtn.addEventListener("click", () => {
    window.location.href = "/login";
})