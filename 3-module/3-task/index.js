function camelize(str) {
  return (result = str
    .split("-")
    .map((item, index) =>
      index != 0 ? item.at(0).toUpperCase() + item.slice(1) : item
    )
    .join(""));
}
