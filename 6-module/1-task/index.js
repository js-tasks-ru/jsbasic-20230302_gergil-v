export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement("table");
    this.render();
  }

  render() {
    this.table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${this.rows
        .map(
          (tr) => `
      <tr>
        <td>${tr.name}</td>
        <td>${tr.age}</td>
        <td>${tr.salary}</td>
        <td>${tr.city}</td>
        <td><button>X</button></td>
      </tr>
      `
        )
        .join("")}
    </tbody>
    `;

    this.table.addEventListener("click", (event) => {
      if (event.target.tagName != "BUTTON") return;
      event.target.closest("tr").remove();
    });
  }

  get elem() {
    return this.table;
  }
}
