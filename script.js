const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romans = {
	1: "I",
	5: "V",
	10: "X",
	50: "L",
	100: "C",
	500: "D",
	1000: "M",
};

const numToRoman = (number) => {
	let result = "";

	while (number > 0) {
		const n = String(number).length;

		if (number >= 9 * 10 ** (n - 1)) {
			result += romans[10 ** (n - 1)] + romans[10 ** n];
			number -= 9 * 10 ** (n - 1);
		} else if (number >= 5 * 10 ** (n - 1)) {
			result += romans[5 * 10 ** (n - 1)];
			number -= 5 * 10 ** (n - 1);
		} else if (number >= 4 * 10 ** (n - 1)) {
			result += romans[10 ** (n - 1)] + romans[5 * 10 ** (n - 1)];
			number -= 4 * 10 ** (n - 1);
		} else {
			result += romans[10 ** (n - 1)];
			number -= 10 ** (n - 1);
		}
	}

	return result;
};

const checkUserInput = () => {
	const number = parseInt(numberInput.value);

	output.classList.remove("warning");
	if (isValid(number)) {
		output.innerText = `${number}: ${numToRoman(number)}`;
	}

	numberInput.value = "";
};

const isValid = (number) => {
	if (
		!numberInput.value ||
		numberInput.value.match(/-[^0-9]/) ||
		isNaN(number)
	) {
		output.innerText = "Please enter a valid number";
	} else if (number <= 0) {
		output.innerText = "Please enter a number greater than or equal to 1";
	} else if (number >= 4000) {
		output.innerText = "Please enter a number less than or equal to 3999";
	} else {
		return true;
	}
	output.classList.add("warning");
	return false;
};

convertBtn.addEventListener("click", () => checkUserInput());
numberInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		checkUserInput();
	}
});
