let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const denominations = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
const userInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeElement = document.getElementById("change-due");
const priceElement = document.getElementById("price");

let cidSum = 0; 
let changeSum = 0;


priceElement.innerText = `Price: $${price}`;

purchaseBtn.addEventListener("click", () => {
  changeElement.innerText = "";
  const value = parseFloat(userInput.value);
  checkInput(value);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    changeElement.innerText = "";
    const value = parseFloat(userInput.value);
    checkInput(value);
  }
})

const adjustValue = (val, isAdjusted) => {
  if (isAdjusted) {
    val /= 100;
  } else {
    val = parseInt(val * 100);
  }
  return val;
}

const calculateSum = (arr) => {
  let sum = 0;
  arr.forEach((elem) => sum += elem[1]);
  return sum;
}

const checkInput = (value) => {
  cidSum = (calculateSum(cid)).toFixed(2);
  if (value === price) {
    changeElement.innerText = "No change due - customer paid with exact cash";
  } else if (value < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cidSum < (value - price)) {
    changeElement.innerText = "Status: INSUFFICIENT_FUNDS";
  } else {
    value = (value - price).toFixed(2);
    value = adjustValue(value, false);
    price = adjustValue(price, false);
    cid.forEach((_elem, index) => cid[index][1] = Math.ceil(adjustValue(cid[index][1], false)));
    let result = calculateChange(value);
    value = adjustValue(value, true);
    price = adjustValue(price, true);
    cid.forEach((_elem, index) => cid[index][1] = (adjustValue(cid[index][1], true)));
    result = result.filter((elem) => elem[1] !== 0);
    changeSum = (calculateSum(result)).toFixed(2);
    if (changeSum === cidSum) {
      displayChange(result, "CLOSED");
    } else {
      displayChange(result, "OPEN");
    }
  }
}

const calculateChange = (value) => {
  let change =[
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
let i = cid.length-1;
  while (value !== 0 || i >= 0) {
    if (value - denominations[i] < 0 
    || cid[i][1] === 0) {
      i--;
      if (value === 0) {
        return change;
      }
      if (i < 0) {
        changeElement.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
      }
    } else {
      value -= denominations[i];
      cid[i][1] -= denominations[i];
      change[i][1] += denominations[i] / 100;
    }
  }
return change;
}

const displayChange = (arr, str) => {
  changeElement.innerText = `Status: ${str}\n`;
  for (let i = arr.length - 1; i >= 0; i--) {
    changeElement.innerText += `${arr[i][0]}: $${arr[i][1].toFixed(2)}\n`
  }
}
