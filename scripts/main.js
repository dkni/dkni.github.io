function calculateFactorial() {
	var x = prompt("Factorial function: enter a non-negative decimal number", 1);
	var result = factorial(x);
		alert(x + "! = " + parseExponentialToReadable(String(result)) + '\n\nThe result was additionally sent to the console.');
		//if you want to copy the number
		console.log(String(result));
		//in case you're curious about the BigInteger's internal representation
		console.log(result);
}

var factorial = function(x){
		if (x < 0 || isNaN(x)) return "Wrong operation";
		if (x <= 1) return x;
		//here using the https://github.com/jtobey/javascript-bignum library
		else return BigInteger.multiply(x, factorial(x-1));
}

function parseExponentialToReadable(s){
	//if in exponential notation
	if (s.includes('e+')){
		var number = s.split('e+');
		number[0] = number[0].replace('.', '');
		//adding as many zeroes as required by the power, taking the fraction into account, optimized concatenation for IE
		var x = parseInt(number[1]) - (number[0].length - 1);
		for (var i = 1; i <= x; i++){
			number[i] = '0';
		}
		var result = number.join(''); 
		return formatBigNumber(result);
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