$(document).ready(function(event) {
	function calculateFactorial() {
		var x = prompt("Factorial function: enter a non-negative integer number (decimal numeric system)", 1);
		if (x === null){
			return;
		}
		var integerPattern = new RegExp(/^\d+$/);
		if (!integerPattern.test(x.toString())) {
			alert ("Wrong input!");
			console.log ("Wrong input: " + x);
		} else {
			var result = factorial(x);
			alert(x + "! = " + formatBigNumber(String(result)) + '\n\nThe result was additionally sent to the console.');
			//if you want to copy the number
			console.log("Factorial of " + x + ":\n\n" + String(result));
			}
	}

	var factorial = function(x){
			if (x < 0) return "Wrong operation";
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
			return result;
		}
		//if not in exponential notation, return the original value
		else {
			return s;
		}
	}

	function formatBigNumber (s){
		//separating every three digits with a comma, starting from the end
		return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}

	$(".menubtn").jqxButton({ width: '150', height: '25', theme: 'darkblue' });
	
	$.ajax({
		url: "https://dkni.github.io/content/books/White Fang/contents.txt",
		type: "GET",
	}).done(function(data){
		data = JSON.parse(data);	
		console.log(data);
		
		$("#menuTree").jqxTree({
			source: data,
			width: '100%',
			height: '100%',
			theme: 'darkblue'
		});
		
		$("#menuTree").on("select", function(event){
			let item = $("#menuTree").jqxTree("getItem", event.args.element);
			$.ajax({
				url: "https://dkni.github.io/content/books/White Fang/Part I/" + item.label + ".txt",
				type: "GET"
			}).done(function(data){
				$("#content").empty();
				$("#content").html(data);
			});
		});
	});
		
	$("#main").on("click", function(){
		$("#content").empty();
	});

	$("#order").on("click", function(){
		$("p").toggleClass("red");
	});
		
	$("#book").on("click", function(){
		
	});
	
	$("#fact").on("click", function(){
		calculateFactorial();
	});
});




















