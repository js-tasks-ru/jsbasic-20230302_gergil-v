function makeDiagonalRed(table) {
  const tr = table.querySelectorAll("tr");
  tr.forEach((item, index) => {
    item.querySelectorAll("td")[index].style.background = "red";
  });
}
