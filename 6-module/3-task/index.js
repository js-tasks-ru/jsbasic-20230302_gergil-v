import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  slides = [];

  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  template() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides
          .map(
            (slide) =>
              `<div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${
              slide.image
            }" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>`;
  }

  render() {
    const elem = createElement(this.template());
    const arrowLeft = elem.querySelector(".carousel__arrow_left");
    const arrowRight = elem.querySelector(".carousel__arrow_right");
    const innerBlock = elem.querySelector(".carousel__inner");
    const slideBlock = elem.querySelector(".carousel__slide");
    const btnAdd = elem.querySelectorAll(".carousel__button");
    let step = 1;

    //вешаем свое событие на клик на кнопку "+"
    btnAdd.forEach((button) => {
      button.addEventListener("click", () => {
        const slideId = button.closest(".carousel__slide").dataset.id;
        const addProductEvent = new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        });

        this.elem.dispatchEvent(addProductEvent);
        console.log(addProductEvent);
      });
    });

    let currentWidth = 0;

    //вызов сркытия левой стрелки при первом запуске
    this.hideButton(arrowRight, arrowLeft, innerBlock, step);

    arrowLeft.addEventListener("click", () => {
      const slideWidth = innerBlock.offsetWidth;
      step -= 1;
      this.hideButton(arrowRight, arrowLeft, innerBlock, step);
      innerBlock.style.transform = `translateX(-${
        currentWidth - slideWidth
      }px)`;
      currentWidth -= slideWidth;
    });
    arrowRight.addEventListener("click", () => {
      const slideWidth = slideBlock.offsetWidth;
      step += 1;
      this.hideButton(arrowRight, arrowLeft, innerBlock, step);
      innerBlock.style.transform = `translateX(-${
        currentWidth + slideWidth
      }px)`;
      currentWidth += slideWidth;
    });

    return elem;
  }

  //функция скрытия стрелок
  hideButton(arrowRight, arrowLeft, innerBlock, step) {
    if (step === innerBlock.children.length) {
      arrowRight.style.display = "none";
    } else {
      arrowRight.style.display = "";
    }
    if (step == 1) {
      arrowLeft.style.display = "none";
    } else {
      arrowLeft.style.display = "";
    }
  }
}
