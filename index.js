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
function createTemplateArray(addressArray) {
  let templateArray = [];

  for (let i = 0; i < addressArray.length; i++) {
    //Considera qualquer string que não tenha números
    if (addressArray[i].match(/^([A-z]+)([^\d])/)) {
      templateArray.push("Word");
    }
    //Considera qualquer string que tenha um dígito
    if (addressArray[i].match(/\d/)) {
      templateArray.push(1);
    }
  }
  //Criação do array temporário para checagem/indexagem
  return templateArray;
}

//Checa se o array tem 2 números, retorna um objeto com Boolean, e os indexes dos 2 números caso existam
function hasTwoNumber(templateArray) {
  let analysedArray = {
    hasTwoNumber: false,
    number1Index: null,
    number2Index: null,
  };
  for (let i = 0; i < templateArray.length; i++) {
    if (templateArray[i] === 1 && analysedArray.number1Index === null) {
      let index1 = templateArray.indexOf(templateArray[i]);
      analysedArray.number1Index = index1;
      i++;
    }
    if (templateArray[i] === 1 && analysedArray.number1Index !== null) {
      let index2 = i;
      analysedArray.number2Index = index2;
      analysedArray.hasTwoNumber = true;
    }
  }
  return analysedArray;
}

//Utiliza o conhecimento do index para cortar o array de forma correta e atualizar os valores de address
function twoNumberAddress(addressArray, analysedArray) {
  address.street = addressArray
    .slice(0, analysedArray.number1Index + 1)
    .join(" ");
  address.number = addressArray.slice(analysedArray.number1Index + 1).join(" ");
}

//Utiliza o conhecimento do index para cortar o array no número da casa e o que vier após
function nationalAddress(addressArray, analysedArray) {
  address.street = addressArray.slice(0, analysedArray.number1Index).join(" ");
  address.number = addressArray.slice(analysedArray.number1Index).join(" ");
}

//Caso o index de dígito seja 0 adiciona array[0] como número, corta o array a partir dele e atribui à rua
function internationalAddress(addressArray) {
  address.number = addressArray[0];
  address.street = addressArray.slice(1).join(" ");
}

for (let i = 0; i < addresses.length; i++) {
  let splitAddress = addresses[i].split(/\s/);

  //Retirada de vírgulas
  for (let j = 0; j < splitAddress.length; j++) {
    splitAddress[j] = splitAddress[j].replace(/\,/, "");
  }

  let mockArray = createTemplateArray(splitAddress);

  let mockAnalysedArray = hasTwoNumber(mockArray);

  if (mockAnalysedArray.hasTwoNumber) {
    twoNumberAddress(splitAddress, mockAnalysedArray);
  }
  if (!mockAnalysedArray.hasTwoNumber && mockAnalysedArray.number1Index === 0) {
    internationalAddress(splitAddress);
  }
  if (!mockAnalysedArray.hasTwoNumber && mockAnalysedArray.number1Index !== 0) {
    nationalAddress(splitAddress, mockAnalysedArray);
  }

  if (address.street.match(/\s$/)) {
    //Retirada de espaços vazios ao fim das strings
    let tempStr = address.street.replace(/\s$/, "");
    address.street = tempStr;
  }

  console.log(address);
  //Limpando address para o próximo input
  address.street = "";
  address.number = "";
}
