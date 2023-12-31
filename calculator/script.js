const buttons = document.querySelectorAll("button");
const input = document.querySelector(".display");
let operators = [];
let numbers = [];
let firstIndex = 0;
let secondIndex = 0;
const fixedOperator = ["+", "-", "*", "/", "%", "!", "="];
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", clickHandler);
}

function clickHandler(button) {
  const btn_target = button.target.value;
  if (btn_target === "AC") {
    return setInit();
  }
  if (checkInputValidity(btn_target)) {
    findOperator(btn_target);
    if (btn_target === "=") {
      calculate();
      setInit(1);
      return;
    }
    input.value += btn_target;
  }
}

function checkInputValidity(btn_target) {
  return (
    !(
      fixedOperator.includes(input.value[input.value.length - 1]) &&
      fixedOperator.includes(btn_target) &&
      input.value[input.value.length - 1] !== "!"
    ) &&
    !(
      fixedOperator.includes(btn_target) &&
      input.value.length === 0 &&
      btn_target !== "-"
    )
  );
}

function setInit(equal) {
  operators = [];
  firstIndex = 0;
  if (equal === 1) {
    secondIndex = (numbers[0] + "").length;
  } else {
    input.value = "";
    secondIndex = 0;
  }
  numbers = [];
}

function findOperator(button) {
  if (fixedOperator.includes(button)) {
    if (button !== "=") {
      operators.push(button);
    }
    numbers.push(Number(input.value.slice(firstIndex, secondIndex)));
    firstIndex = secondIndex + 1;
  }
  secondIndex++;
  if (button === "00") {
    secondIndex++;
  }
}

function calculate() {
  let result = 0;
  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case "+":
        result = numbers.shift() + numbers.shift();
        break;
      case "-":
        result = numbers.shift() - numbers.shift();
        break;
      case "*":
        result = numbers.shift() * numbers.shift();
        break;
      case "/":
        result = numbers.shift() / numbers.shift();
        break;
      case "%":
        result = numbers.shift() % numbers.shift();
        break;
      case "!":
        result = factorial(numbers.shift());
      default:
        break;
    }
    numbers.unshift(result);
  }
  input.value = result;
}

function factorial(number) {
  let factorial = 1;
  for (let i = 1; i <= number; i++) {
    factorial *= i;
  }
  return factorial;
}
