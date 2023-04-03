function hideSelf() {
  document
    .querySelector(".hide-self-button")
    .addEventListener("click", (e) => (e.target.hidden = true));
}
