import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  #elem = null;
  #productsFiltred = null;
  #activeFilters = {
    noNuts: false,
    vegeterianOnly: false,
    maxSpiciness: null,
    category: null,
  };

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#productsFiltred = this.products;
    this.#render();
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `;
  }

  #render() {
    this.#elem = createElement(this.#template());
    this.#renderCards(this.products);
  }

  #renderCards(products) {
    const productsInner = this.#elem.querySelector(".products-grid__inner");

    products.map((product) => {
      const card = new ProductCard(product);
      productsInner.append(card.elem);
    });
  }

  updateFilter(filters) {
    this.#productsFiltred = this.products;
    const activeFilters = this.#activeFilters;

    Object.keys(filters).forEach((key) => {
      activeFilters[key] = filters[key];
    });

    if (activeFilters.noNuts) {
      this.#productsFiltred = this.#productsFiltred.filter(
        (product) => product.nuts === false || product.nuts === undefined
      );
    }

    if (activeFilters.vegeterianOnly) {
      this.#productsFiltred = this.#productsFiltred.filter(
        (product) => product.vegeterian === true
      );
    }

    if (activeFilters.maxSpiciness) {
      this.#productsFiltred = this.#productsFiltred.filter(
        (product) => product.spiciness <= activeFilters.maxSpiciness
      );
    }

    if (activeFilters.category) {
      this.#productsFiltred = this.#productsFiltred.filter(
        (product) => product.category === activeFilters.category
      );
    }

    this.#elem.querySelector(".products-grid__inner").innerHTML = "";
    this.#renderCards(this.#productsFiltred);
  }

  get elem() {
    return this.#elem;
  }
}
