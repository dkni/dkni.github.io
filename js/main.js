$(document).ready(function(event) {
	toastr.options = {
					"positionClass": "toast-top-left",
					"showDuration": "200",
					"hideDuration": "500"
				};
				
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
	
	function clearContents(){
		$("#sideMenu").empty();
		$("#content").empty();
	}

	$(".menubtn").jqxButton({ width: '180', height: '45', theme: 'darkblue' });
	
	
		
	$("#main").on("click", function(){
		clearContents();
	});	
		
	$("#books").on("click", function(){
		clearContents();
		$.ajax({
		url: "https://dkni.github.io/content/books/White Fang/contents.txt",
		type: "GET",
		beforeSend: function(){
			$("#sideMenu").html("<img class='loadingImg' src='content/images/LoadingIcon.gif' />");
		}
	}).done(function(data){
		data = JSON.parse(data);			
		$("#sideMenu").jqxTree({
			source: data,
			width: '100%',
			height: '100%',
			theme: 'darkblue'
		});
		
		$("#sideMenu").on("select", function(event){
			let treeChapter = event.args.element;
			let chapter = $("#sideMenu").jqxTree("getItem", treeChapter);
			if (!/^Chapter*/.test(chapter.label)) { return; }
			$("#content").html("<img class='loadingImg' src='content/images/LoadingIcon.gif' />");
			let treePart = treeChapter.parentElement.parentElement;
			let treeBook = treePart.parentElement.parentElement;

			let part = $("#sideMenu").jqxTree("getItem", treePart);
			let book = $("#sideMenu").jqxTree("getItem", treeBook);
			
			$.ajax({
				url: "https://dkni.github.io/content/books/" + book.label + "/" + part.label + "/" + chapter.label + ".txt",
				type: "GET",
				error: function(xhr, ajaxOptions, thrownError){
					toastr.error(xhr.status + " (" + xhr.statusText + ")", "Error!");
				}
			}).done(function(data){
				$("#content").empty();
				$("#content").html(data);
				$("#contentContainer").scrollTop(0);
			});
		});
	});
	});
	
	$("#fact").on("click", function(){
		clearContents();
		calculateFactorial();
	});
	
	$("#about").on("click", function(){
		clearContents();
		$.ajax({
			url: "https://jobs.tut.by/resume/bb771d7eff028265d10039ed1f6b616a386570",
			type: "GET",
			error: function(xhr){				
				toastr.error("Sorry, not implemented yet!", "Error!");
			}
		}).done(function(data){
			$("#sideMenu").empty();
			$("#content").empty();
			$("#content").css("width", "100%");
			$("#content").html(data);
		});
	});
});




