export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement("table");
    this.makeTable();
  }

  makeTable() {
    this.table.innerHTML = `<thead>
                              <tr>
                                <th>Имя</th>
                                <th>Возраст</th>
                                <th>Зарплата</th>
                                <th>Город</th>
                                <th></th>
                              </tr>
                            </thead>`;

    let tbody = document.createElement("tbody");

    for (let i = 0; i < this.rows.length; i++) {
      let tr = document.createElement("tr");

      let tdDel = document.createElement("td");
      tdDel.innerHTML = "<button>X</button>";

      for (let key in this.rows[i]) {
        let td = document.createElement("td");
        td.innerHTML = this.rows[i][key];
        tr.appendChild(td);
      }
      tr.append(tdDel);
      tbody.append(tr);
    }

    this.table.append(tbody);

    this.table.addEventListener("click", (event) => {
      if (event.target.tagName != "BUTTON") return;
      event.target.closest("tr").remove();
    });
  }

  get elem() {
    return this.table;
  }
}
