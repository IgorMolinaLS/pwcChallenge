let addresses = [
  "Miritiba 339",
  "Babaçu 500",
  "Cambuí 804B",
  "Rio Branco 23",
  "Quirino dos Santos 23 b",
];

let address = {
  street: "",
  number: 0,
};

for (let i = 0; i < addresses.length; i++) {
  let splitAddress = addresses[i].split(/\s(?=\d)/);

  address.number = splitAddress.pop();
  address.street = splitAddress.join(" ");
  console.log(address);
}
