function showSalary(users, age) {
  return (result = users
    .filter((item) => item.age <= age)
    .map((item) => `${item.name}, ${item.balance}`)
    .join("\n"));
}
