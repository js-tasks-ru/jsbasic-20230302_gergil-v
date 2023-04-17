export default class StepSlider {
  #steps = 0;
  #slider = "";

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#slider = this.#render(value);
  }

  #template(value) {
    return `
    <div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        <span  class="slider__step-active"></span>
      </div>
    </div>
    `;
  }

  #render(value) {
    const slider = createElement(this.#template(value));
    const stepsContainer = slider.querySelector(".slider__steps");
    const span = "<span></span>";

    for (let i = 1; i < this.#steps; i++) {
      stepsContainer.innerHTML += span;
    }

    slider.addEventListener("click", (event) => {
      this.sliderClickEvent(event);
    });

    return slider;
  }

  sliderClickEvent = (event) => {
    const slider = this.#slider;
    const sliderValueContainer = slider.querySelector(".slider__value");
    const thumb = slider.querySelector(".slider__thumb");
    const progress = slider.querySelector(".slider__progress");

    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;

    sliderValueContainer.innerHTML = value;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    const sliderChangeEvent = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });

    return slider.dispatchEvent(sliderChangeEvent);
  };

  get elem() {
    return this.#slider;
  }
}
