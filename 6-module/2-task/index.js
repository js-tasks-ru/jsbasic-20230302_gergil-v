import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  elem = null;
  #product = null;

  constructor(product) {
    this.#product = product;
    this.elem = this.#render();
  }

  #template() {
    return `
      <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${
              this.#product.image
            }" class="card__image" alt="product">
            <span class="card__price">€${this.#product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.#product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>
  `;
  }

  //чтобы не потерять контекст используем стрелочную функцию
  #addButtonClick = () => {
    const productId = this.#product.id;
    const productCardEvent = new CustomEvent("product-add", {
      detail: productId,
      bubbles: true,
    });

    return this.elem.dispatchEvent(productCardEvent);
  };

  #render() {
    const elem = createElement(this.#template());

    const addBtn = elem.querySelector(".card__button");
    addBtn.addEventListener("click", this.#addButtonClick);

    return elem;
  }
}
