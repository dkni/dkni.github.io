function calculateFactorial() {
	x = prompt("Factorial function: enter a number", 1);
	alert(x + "! = " + factorial(x));
}

var factorial = function(x){
		if (x===1) return x;
		else return x * factorial(x-1);
}