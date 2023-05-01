export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (item) {
      item.count++;
    } else {
      this.cartItems.push({
        product,
        count: 1,
      });
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
