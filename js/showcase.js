document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer =
        document.getElementById("showcase-slides");

    const slides =
        document.querySelectorAll(".product-showcase-slide");

    const tabs =
        document.querySelectorAll(".showcase-tab");

    const dots =
        document.querySelectorAll(".showcase-dot");

    const prevButton =
        document.getElementById("showcase-prev");

    const nextButton =
        document.getElementById("showcase-next");

    if (
        !slidesContainer ||
        !slides.length ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        slidesContainer.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        tabs.forEach((tab, index) => {
            tab.classList.toggle(
                "active",
                index === currentSlide
            );
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentSlide
            );
        });
    }

    prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const index = Number(tab.dataset.slide);
            showSlide(index);
        });
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.slide);
            showSlide(index);
        });
    });

    showSlide(0);
});