function calculateFactorial() {
	var x = prompt("Factorial function: enter a number (0 - 170)", 1);
	alert(x + "! = " + factorial(x));
}

var factorial = function(x){
		if (x<0) return "Wrong operation";
		if (x<=1) return x;
		else return x * factorial(x-1);
}
