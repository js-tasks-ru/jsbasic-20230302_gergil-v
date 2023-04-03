function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  friends.forEach(
    (item) => (ul.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`)
  );
  return ul;
}
