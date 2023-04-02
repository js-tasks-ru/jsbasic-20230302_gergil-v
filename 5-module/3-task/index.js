function initCarousel() {
  const slider = document.querySelector(".carousel");
  const sliderBlock = document.querySelector(".carousel__inner");
  const sliderWidth = sliderBlock.offsetWidth;
  let cnt = 1;
  document.querySelector(".carousel__arrow_left").style.display = "none";

  slider.addEventListener("click", (event) => {
    if (!event.target.closest(".carousel__arrow")) return;

    let arrow = event.target.closest(".carousel__arrow");

    if (arrow.classList.contains("carousel__arrow_left")) {
      sliderBlock.style.transform =
        "translateX(-" + sliderWidth * (cnt - 2) + "px)";
      cnt--;
    } else {
      sliderBlock.style.transform = "translateX(-" + sliderWidth * cnt + "px)";
      cnt++;
    }

    if (cnt >= 4) {
      document.querySelector(".carousel__arrow_right").style.display = "none";
    } else {
      document.querySelector(".carousel__arrow_right").style.display = "flex";
    }
    if (cnt == 1) {
      document.querySelector(".carousel__arrow_left").style.display = "none";
    } else {
      document.querySelector(".carousel__arrow_left").style.display = "flex";
    }
  });
}
