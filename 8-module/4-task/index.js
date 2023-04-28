import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (item) {
      item.count++;
    } else {
      item = {
        product,
        count: 1,
      };
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );

    item.count += amount;

    if (item.count === 0) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
      let cartElems = Array.from(
        document.body.querySelectorAll("[data-product-id]")
      );
      cartElems.map((e) => {
        if (e.getAttribute("data-product-id") === item.product.id) {
          e.remove();
        }
      });
    }

    this.onProductUpdate(item);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let cart = createElement(`<div></div>`);

    this.cartItems.map((item) =>
      cart.append(this.renderProduct(item.product, item.count))
    );
    cart.append(this.renderOrderForm());

    this.modal.setBody(cart);
    const buttonMinus = Array.from(
      cart.querySelectorAll(".cart-counter__button_minus")
    );
    const buttonPlus = Array.from(
      cart.querySelectorAll(".cart-counter__button_plus")
    );

    buttonMinus.map((button) => {
      button.onclick = ({ target }) => {
        const productId = target
          .closest("div[data-product-id]")
          .getAttribute("data-product-id");
        this.updateProductCount(productId, -1);
      };
    });

    buttonPlus.map((button) => {
      button.onclick = ({ target }) => {
        const productId = target
          .closest("div[data-product-id]")
          .getAttribute("data-product-id");
        this.updateProductCount(productId, 1);
      };
    });

    const form = cart.querySelector(".cart-form");
    form.addEventListener("submit", (event) => this.onSubmit(event));

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    let isModalOpen = document.querySelector(".is-modal-open");

    if (isModalOpen) {
      let cartItemsIsEmpty = this.isEmpty();
      if (!cartItemsIsEmpty) {
        if (cartItem.count > 0) {
          let productId = cartItem.product.id;
          let productCount = document.body.querySelector(
            `[data-product-id="${productId}"] .cart-counter__count`
          );
          let productPrice = document.body.querySelector(
            `[data-product-id="${productId}"] .cart-product__price`
          );
          let infoPrice = document.body.querySelector(
            `.cart-buttons__info-price`
          );

          productCount.innerHTML = cartItem.count;

          productPrice.innerHTML = `€${(
            cartItem.product.price * cartItem.count
          ).toFixed(2)}`;

          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
      } else {
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    event.target.querySelector('[type="submit"]').classList.add("is-loading");
    const formData = new FormData(event.target);
    let res = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const modalTitle = document.querySelector(".modal__title");
      modalTitle.innerHTML = "";
      this.modal.setTitle("Success!");
      let sucecessBody = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `);
      this.modal.setBody(sucecessBody);
      this.cartItems = [];
      this.cartIcon.update(this);
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
