export default function promiseClick(button) {
  return new Promise((resolve) => {
    button.addEventListener(
      "click",
      (e) => {
        resolve(e);
      },
      { once: true }
    );
  });
}
