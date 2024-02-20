let addresses = [
  "Miritiba 339",
  "Babaçu 500",
  "Cambuí 804B",
  "Rio Branco 23",
  "Quirino dos Santos 23 b",
  "4, Rue de la République",
  "100 Broadway Av",
  "Calle Sagasta, 26",
  "Calle 44 No 1991",
];

let address = {
  street: "",
  number: "",
};

//Helper Functions:
//Cria um array secundário com 'Word' e 1 dependendo do dado do endereço recebido
function createTempArray(stringArray) {
  let tempArray = [];

  for (let i = 0; i < stringArray.length; i++) {
    //Considera qualquer string que não tenha números
    if (stringArray[i].match(/^([A-z]+)([^\d])/)) {
      tempArray.push("Word");
    }
    //Considera qualquer string que tenha um dígito
    if (stringArray[i].match(/\d/)) {
      tempArray.push(1);
    }
  }
  //Criação do array temporário para checagem/indexagem
  return tempArray;
}

//Checa se o array tem 2 números, retorna um objeto com Boolean, e os indexes dos 2 números caso existam
function hasTwoNumber(tempArray) {
  let arrayAnalysed = {
    hasTwoNumber: false,
    number1Index: null,
    number2Index: null,
  };
  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i] === 1 && arrayAnalysed.number1Index === null) {
      let index1 = tempArray.indexOf(tempArray[i]);
      arrayAnalysed.number1Index = index1;
      i++;
    }
    if (tempArray[i] === 1 && arrayAnalysed.number1Index !== null) {
      let index2 = i;
      arrayAnalysed.number2Index = index2;
      arrayAnalysed.hasTwoNumber = true;
    }
  }
  return arrayAnalysed;
}

//Utiliza o conhecimento do index para cortar o array de forma correta e atualizar os valores de address
function twoNumberAddress(addressArray, analysedArray) {
  address.street = addressArray
    .slice(0, analysedArray.number1Index + 1)
    .join(" ");
  address.number = addressArray.slice(analysedArray.number1Index + 1).join(" ");
}

//Utiliza o conhecimento do index para cortar o array no número da casa e o que vier após
function nationalAddress(stringArray, analysedArray) {
  address.street = stringArray.slice(0, analysedArray.number1Index).join(" ");
  address.number = stringArray.slice(analysedArray.number1Index).join(" ");
}

//Caso o index de dígito seja 0 adiciona array[0] como número, corta o array a partir dele e atribui à rua
function internationalAddress(stringArray) {
  address.number = stringArray[0];
  address.street = stringArray.slice(1).join(" ");
}

for (let i = 0; i < addresses.length; i++) {
  var splitAddress = addresses[i].split(/\s/);

  //Retirada de vírgulas
  for (let j = 0; j < splitAddress.length; j++) {
    splitAddress[j] = splitAddress[j].replace(/\,/, "");
  }

  let mockArray = createTempArray(splitAddress);

  let analyseMockArray = hasTwoNumber(mockArray);

  if (analyseMockArray.hasTwoNumber === true) {
    twoNumberAddress(splitAddress, analyseMockArray);
  }
  if (
    analyseMockArray.hasTwoNumber !== true &&
    analyseMockArray.number1Index === 0
  ) {
    internationalAddress(splitAddress);
  }
  if (
    analyseMockArray.hasTwoNumber !== true &&
    analyseMockArray.number1Index !== 0
  ) {
    nationalAddress(splitAddress, analyseMockArray);
  }

  if (address.street.match(/\s$/)) {
    let tempStr = address.street.replace(/\s$/, "");
    address.street = tempStr; //Retirada de espaços vazios
  }

  console.log(address);
  address.street = "";
  address.number = "";
}
