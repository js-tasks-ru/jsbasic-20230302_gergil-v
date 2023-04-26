import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #elem = null;
  #steps = null;
  #value = 0;
  #currentValue = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
  }

  #template() {
    return `
      <!--Корневой элемент слайдера-->
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <!--Полоска слайдера-->
        <div class="slider__progress"></div>
        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
        </div>
      </div>
    `;
  }

  #render() {
    this.#elem = createElement(this.#template());
    const sliderSteps = this.#elem.querySelector(".slider__steps");
    for (let i = 0; i < this.#steps; i++) {
      const span = document.createElement("span");
      sliderSteps.append(span);
      if (i === 0) span.classList.add("slider__step-active");
    }

    this.#slideEvent();
  }

  #dispatchCustomEvent = (value) => {
    const event = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };

  #slideEvent = () => {
    const stepsNodes = this.#elem.querySelectorAll(".slider__steps>span");

    let thumb = this.#elem.querySelector(".slider__thumb");
    let progress = this.#elem.querySelector(".slider__progress");
    let sliderValue = this.#elem.querySelector(".slider__value");

    this.#elem.addEventListener("click", ({ clientX }) => {
      let { width, left } = this.#elem.getBoundingClientRect();
      let offset = clientX - left;
      let leftRelative = offset / width;
      let segments = this.#steps - 1;
      let approximateValue = Math.round(leftRelative * segments);

      stepsNodes.forEach((step) => {
        step.classList.remove("slider__step-active");
      });
      stepsNodes[approximateValue].classList.add("slider__step-active");
      let valuePercents = (approximateValue / segments) * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.textContent = approximateValue;
      this.#dispatchCustomEvent(approximateValue);
    });
  };

  get elem() {
    return this.#elem;
  }
}
