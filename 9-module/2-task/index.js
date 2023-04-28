import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  productsGrid = "";
  products = [];

  constructor() {}

  async render() {
    const carousel = new Carousel(slides);
    const carouselContainer = document.body.querySelector(
      "[data-carousel-holder]"
    );
    carouselContainer.append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    const ribbonContainer = document.body.querySelector("[data-ribbon-holder]");

    ribbonContainer.append(ribbonMenu.elem);

    const stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });

    const sliderContainer = document.body.querySelector("[data-slider-holder]");
    sliderContainer.append(stepSlider.elem);

    const cartIcon = new CartIcon();
    const cartIconContainer = document.body.querySelector(
      "[data-cart-icon-holder]"
    );

    cartIconContainer.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    let response = await fetch("products.json");
    this.products = await response.json();

    this.productsGrid = new ProductsGrid(this.products);
    const productsGridContainer = document.body.querySelector(
      "[data-products-grid-holder]"
    );

    productsGridContainer.removeChild(productsGridContainer.children[0]);
    productsGridContainer.append(this.productsGrid.elem);

    document.body.addEventListener("product-add", (event) => {
      this.products.map((product) => {
        if (product.id === event.detail) {
          cart.addProduct(product);
        }
      });
    });

    document.body
      .querySelector(".slider")
      .addEventListener("slider-change", (event) => {
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail,
        });
      });

    document.body
      .querySelector(".ribbon")
      .addEventListener("ribbon-select", (event) => {
        this.productsGrid.updateFilter({
          category: event.detail,
        });
      });

    document.querySelector("#nuts-checkbox").addEventListener("change", () => {
      this.productsGrid.updateFilter({
        noNuts: document.querySelector("#nuts-checkbox").checked,
      });
    });

    document
      .querySelector("#vegeterian-checkbox")
      .addEventListener("change", () => {
        this.productsGrid.updateFilter({
          vegeterianOnly: document.querySelector("#vegeterian-checkbox")
            .checked,
        });
      });
  }
}
