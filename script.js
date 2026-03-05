let primaryNum = "";
let secondaryNum = "";
let operation = "";
let primaryIsResult = false;
let operationPressed = false;
let usesPreviousResult = true;

function add(a, b) {
	return parseFloat((a + b).toFixed(2));
}

function subtract(a, b) {
	return parseFloat((a - b).toFixed(2));
}

function multiply(a, b) {
	return parseFloat((a * b).toFixed(2));
}

function divide(a, b) {
	return parseFloat((a / b).toFixed(2));
}

function operate() {
	if (primaryNum === "" || secondaryNum === "") return;
	primaryNum = Number(primaryNum);
	secondaryNum = Number(secondaryNum);
	if (secondaryNum == 0 && operation === "/") {
		alert("Do not divide by zero.");
		clearCalculator();
	}
	primaryIsResult = true;
	switch (operation) {
		case "+":
			pushResult(add(primaryNum, secondaryNum));
			break;
		case "-":
			pushResult(subtract(primaryNum, secondaryNum));
			break;
		case "x":
			pushResult(multiply(primaryNum, secondaryNum));
			break;
		case "/":
			pushResult(divide(primaryNum, secondaryNum));
			break;
	}
	secondaryNum = "";
}

function pushNumber(num) {
	if (!operationPressed && !primaryIsResult) {
		if (num === "." && primaryNum.includes(".")) {
			return;
		}
		primaryNum += num;
	} else if (operationPressed && !primaryIsResult) {
		if (num === "." && secondaryNum.includes(".")) {
			return;
		}
		secondaryNum += num;
	} else if (primaryIsResult) {
		if (!usesPreviousResult) {
			primaryNum = secondaryNum = "";
			primaryNum += num;
			operationPressed = primaryIsResult = false;
			changeDisplay("secondaryNum", secondaryNum);
			changeDisplay("primaryNum", primaryNum);
			return;
		}
		if (num === "." && secondaryNum.includes(".")) {
			return;
		}
		secondaryNum += num;
	}
	changeDisplay("secondaryNum", secondaryNum);
	changeDisplay("primaryNum", primaryNum);
}

function pushResult(num) {
	primaryNum = num;
	changeDisplay("secondaryNum", "");
	changeDisplay("primaryNum", primaryNum);
}

function pushOperation(op) {
    if (primaryNum === "") return
	if (operationPressed && secondaryNum != "") {
		operate();
	}
	operationPressed = true;
	operation = op;
	changeDisplay("operation", op);
}

function clearCalculator() {
	primaryNum = secondaryNum = operation = "";
	primaryIsResult = false;
	operationPressed = false;
	changeDisplay("primaryNum", primaryNum);
	changeDisplay("secondaryNum", secondaryNum);
	changeDisplay("operation", operation);
	return;
}

function changeDisplay(place, content) {
	UI[place].textContent = content;
}

function backspace() {
	if (!operationPressed && !primaryIsResult) {
		primaryNum = primaryNum.slice(0, -1);
	} else {
		secondaryNum = secondaryNum.slice(0, -1);
	}
	changeDisplay("secondaryNum", secondaryNum);
	changeDisplay("primaryNum", primaryNum);
}

function keyboardSolver(keyName) {
	switch (keyName) {
		case "0":
			pushNumber("0");
			break;
		case "1":
			pushNumber("1");
			break;
		case "2":
			pushNumber("2");
			break;
		case "3":
			pushNumber("3");
			break;
		case "4":
			pushNumber("4");
			break;
		case "5":
			pushNumber("5");
			break;
		case "6":
			pushNumber("6");
			break;
		case "7":
			pushNumber("7");
			break;
		case "8":
			pushNumber("8");
			break;
		case "9":
			pushNumber("9");
			break;
		case "+":
			pushOperation("+");
			break;
		case "-":
			pushOperation("-");
			break;
		case "x":
			pushOperation("x");
			break;
		case "*":
			pushOperation("x");
			break;
		case "/":
			pushOperation("/");
			break;
		case ".":
			pushNumber(".");
			break;
		case "=":
			operate();
			break;
		case "Enter":
			operate();
			break;
		case "Escape":
			clearCalculator();
			break;
		case "c":
			clearCalculator();
			break;
		case "Backspace":
			backspace();
			break;
	}
}

const UI = {
	zero: document.querySelector("#btn-0"),
	one: document.querySelector("#btn-1"),
	two: document.querySelector("#btn-2"),
	three: document.querySelector("#btn-3"),
	four: document.querySelector("#btn-4"),
	five: document.querySelector("#btn-5"),
	six: document.querySelector("#btn-6"),
	seven: document.querySelector("#btn-7"),
	eight: document.querySelector("#btn-8"),
	nine: document.querySelector("#btn-9"),
	backspace: document.querySelector("#btn-backspace"),

	add: document.querySelector("#btn-add"),
	subtract: document.querySelector("#btn-subtract"),
	multiply: document.querySelector("#btn-multiply"),
	divide: document.querySelector("#btn-divide"),
	decimal: document.querySelector("#btn-decimal"),
	equals: document.querySelector("#btn-equals"),
	clear: document.querySelector("#btn-clear"),

	display: document.querySelector("#display"),
	primaryNum: document.querySelector("#primary-num"),
	secondaryNum: document.querySelector("#secondary-num"),
	operation: document.querySelector("#operation"),
	clearResult: document.querySelector("#clear-result"),
	isClearResult: document.querySelector("a"),
};

UI.zero.addEventListener("click", () => pushNumber("0"));
UI.one.addEventListener("click", () => pushNumber("1"));
UI.two.addEventListener("click", () => pushNumber("2"));
UI.three.addEventListener("click", () => pushNumber("3"));
UI.four.addEventListener("click", () => pushNumber("4"));
UI.five.addEventListener("click", () => pushNumber("5"));
UI.six.addEventListener("click", () => pushNumber("6"));
UI.seven.addEventListener("click", () => pushNumber("7"));
UI.eight.addEventListener("click", () => pushNumber("8"));
UI.nine.addEventListener("click", () => pushNumber("9"));
UI.add.addEventListener("click", () => {
	pushOperation("+");
});
UI.subtract.addEventListener("click", () => {
	pushOperation("-");
});
UI.multiply.addEventListener("click", () => {
	pushOperation("x");
});
UI.divide.addEventListener("click", () => {
	pushOperation("/");
});
UI.decimal.addEventListener("click", () => {
	pushNumber(".");
});
UI.equals.addEventListener("click", () => {
	operate();
});
UI.clear.addEventListener("click", () => clearCalculator());
UI.backspace.addEventListener("click", () => backspace());
UI.clearResult.addEventListener("click", () => {
	usesPreviousResult = !usesPreviousResult;
	changeDisplay("isClearResult", " " + !usesPreviousResult);
});

document.addEventListener("keyup", (event) => {
	keyboardSolver(event.key);
});
