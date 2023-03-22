function showSalary(users, age) {
  let str = "";
  result = users.filter((item) => item.age <= age);
  result.forEach((item, index) => {
    let endStr = index !== result.length - 1 ? "\n" : "";
    str += item.name + ", " + item.balance + endStr;
  });

  return str;
}
