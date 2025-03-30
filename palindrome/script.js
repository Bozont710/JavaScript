const userInput = document.getElementById("text-input");
const result = document.getElementById("result");
const button = document.getElementById("check-btn");
const checkbox = document.getElementById("clear");
let clear = true;

button.addEventListener("click", isPalindrome);
checkbox.addEventListener("click", toggleClear);

function isPalindrome() {
  if (userInput.value === '') {
    alert("Please input a value.")
  }
  const original = userInput.value;
  const value = cleanInputString(original.toLowerCase());
  let reverseValue = [];
  for (const item of value) {
    reverseValue.push(item);
  }
  reverseValue = reverseValue.reverse().join("");

  console.log(reverseValue);
  console.log(value);
  console.log(clear);

  if (reverseValue === value) {
    result.innerText = `${original} is a palindrome`;
  } else {
    result.innerText = `${original} is not a palindrome`;
  }
  setInterval(reset, 20000);
}

function toggleClear() {
  clear = !clear;
}

function reset() {
  result.innerText = "Please input a value";
  if (clear) {
    userInput.value = "";
  }
}

function cleanInputString(str) {
  const regex = /[-_(),.\/\\\s]/g;
  console.log("cleanup " + str.replace(regex, ''));
  return str.replace(regex, '');
  
}

