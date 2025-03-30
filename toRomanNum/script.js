const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

const conversionArr = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1]
];

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput()
  }
});
convertButton.addEventListener("click", checkInput);

function checkInput() {
  const value = parseInt(numberInput.value);
  
  if (isNaN(value)) {
    output.innerText = "Please enter a valid number";
    clearOutput();
  } else if (value < 1) {
    output.innerText = "Please enter a number greater than or equal to 1";
    clearOutput();
  } else if (value >= 4000) {
    output.innerText = "Please enter a number less than or equal to 3999";
    clearOutput();
  } else {
    convert(value);
  }
}

function clearOutput() {
    setTimeout(() => {
    output.innerText = "";
  }, 5000);
}

function convert(num) {
  let result = "";
  conversionArr.forEach((curr) => {
    while(num >= curr[1]) {
      result += curr[0];
      num -= curr[1];
    }
  });
  output.innerText = result;
  clearOutput();
}