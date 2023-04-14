import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #elem = null;
  #categories = null;

  constructor(categories) {
    this.#categories = categories;
    this.#elem = this.#render();
  }

  #template() {
    return `
    <!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${this.#categories
          .map(
            (categorie) =>
              `<a href="#" class="ribbon__item ribbon__item_active" data-id=${categorie.id}>${categorie.name}</a>`
          )
          .join("")}
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `;
  }

  #render() {
    const menu = createElement(this.#template());
    const arrowRight = menu.querySelector(".ribbon__arrow_right");
    const arrowLeft = menu.querySelector(".ribbon__arrow_left");
    const scrollContainer = menu.querySelector(".ribbon__inner");
    let scrollStep = 350;

    //устанавливаем начальные значения стрелок
    arrowLeft.classList.remove("ribbon__arrow_visible");
    arrowRight.classList.add("ribbon__arrow_visible");

    //события клик на кнопках
    arrowRight.addEventListener("click", () => {
      scrollContainer.scrollBy(scrollStep, 0);
    });

    arrowLeft.addEventListener("click", () => {
      scrollContainer.scrollBy(-scrollStep, 0);
    });

    //обработка события scroll в меню
    scrollContainer.addEventListener("scroll", () => {
      let scrollWidth = scrollContainer.scrollWidth;
      let scrollLeft = scrollContainer.scrollLeft;
      let clientWidth = scrollContainer.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      //видимость кнопок при прокрутке
      if (scrollLeft === 0) {
        arrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        arrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight === 0) {
        arrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        arrowRight.classList.add("ribbon__arrow_visible");
      }
    });

    //вешаем событие на пункты меню
    const menuItems = scrollContainer.querySelectorAll(".ribbon__item");
    menuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        let target = event.target;
        event.preventDefault();

        menuItems.forEach((item) => {
          item.classList.remove("ribbon__item_active");
        });

        target.classList.add("ribbon__item_active");
        this.#menuItemClick(target);
      });
    });

    return menu;
  }

  //создание кастомного события
  //чтобы не потерять контекст используем стрелочную функцию
  #menuItemClick = (target) => {
    const menuItemEvent = new CustomEvent("ribbon-select", {
      detail: target.dataset.id,
      bubbles: true,
    });

    return this.#elem.dispatchEvent(menuItemEvent);
  };

  get elem() {
    return this.#elem;
  }
}
