function calculateFactorial() {
	var x = prompt("Factorial function: enter a number (0 - 170)", 1);
	//alert(x + "! = " + factorial(x));
	var result = factorial(x);
	if (x>21) //from here javascript switches into exponential notation
		alert(x + "! = " + parseExponentialToReadable(String(result)) + '\n(exponential notation: ' + result + ')');
	else
		alert(x + "! = " + parseExponentialToReadable(String(result)));
}

var factorial = function(x){
		if (x < 0) return "Wrong operation";
		if (x <= 1) return x;
		else return x * factorial(x - 1);
}

function parseExponentialToReadable(s){
	//if in exponential notation
	if (s.includes('e+')){
		var number = s.split('e+');
		number[0] = number[0].replace('.', '');
		//adding as many zeroes as required by the power, taking the fraction into account
		var x = parseInt(number[1]) - (number[0].length - 1);
		for (var i = 0; i < x; i++){
			number[0] += '0';
		}
		return formatBigNumber(number[0]);
	}
	//if not in exponential notation, return the original value, formatted
	else {
		return formatBigNumber(s);
	}
}

function formatBigNumber (s){
	//separating every three digits with a comma, starting from the end
	return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}