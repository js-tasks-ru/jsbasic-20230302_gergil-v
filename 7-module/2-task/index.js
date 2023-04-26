import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  #modal = "";

  constructor() {
    this.#modal = this.#render();
  }

  #template() {
    return `
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>

    </div>
    `;
  }

  #render() {
    const modal = createElement(this.#template());
    const modalCloseButton = modal.querySelector(".modal__close");

    modalCloseButton.addEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.code === "Escape") {
          this.close();
        }
      },
      { once: true }
    );

    return modal;
  }

  open() {
    const body = document.querySelector("body");
    body.classList.add("is-modal-open");
    document.body.append(this.#modal);
  }

  close() {
    const body = document.querySelector("body");
    body.classList.remove("is-modal-open");
    this.#modal.remove();
  }

  setTitle(title) {
    const modalTitle = this.#modal.querySelector(".modal__title");
    modalTitle.append(title);
  }

  setBody(node) {
    const modalBody = this.#modal.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(node);
  }
}
