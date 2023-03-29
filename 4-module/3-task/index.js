function highlight(table) {
  const trStatus = table.querySelectorAll("tbody tr td:last-child");
  const trMale = table.querySelectorAll("tbody tr td:nth-child(3)");
  const trAge = table.querySelectorAll("tbody tr td:nth-child(2)");

  trStatus.forEach((td) => {
    if (td.dataset.available == "true") {
      td.closest("tr").classList.add("available");
    } else if (td.dataset.available == "false") {
      td.closest("tr").classList.add("unavailable");
    } else {
      td.closest("tr").hidden = "true";
    }
  });

  trMale.forEach((td) => {
    if (td.innerText == "m") {
      td.closest("tr").classList.add("male");
    } else {
      td.closest("tr").classList.add("female");
    }
  });

  trAge.forEach((td) => {
    if (+td.innerText < 18) {
      td.closest("tr").style.textDecoration = "line-through";
    }
  });
}
