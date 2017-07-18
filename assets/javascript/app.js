
$(document).ready(function(){



	// =======================
	// DEFINE ALL THE VARIABLE
	// =======================

//put all the questions in an rarray stored under variable name allQuestions
	var allQuestions = [
	// question 1
	{
		question: "How to say 'Hello' in Vietnamese?",
		answers: ['tam biet', 'khoe khong','cam on', 'xin chao'],
		correctAnswer: 3,
	},

	//question 2
	{
		question: "What is Vietnam's capital?",
		answers: ['Hannoi', 'Saigon','Nha Trang', 'Da Nang'],
		correctAnswer: 0,
	},

	//question 3
	{
		question: "Which city is consider as second Hawaii in Vietnam?",
		answers: ['Saigon', 'Long An', 'Can Tho', 'Nha Trang'],
		correctAnswer: 3,
	},

	//question 4
	{
		question: "Which one below is not tradition breakfast in Vietnam?",
		answers: ['Catfish Stew', 'Pho', 'Beef Stew', 'Broken Rice & Pork Chop'],
		correctAnswer: 0,
	},

	//question 5
	{
		question: "Which is the most transporation method in Vietnam?",
		answers: ['Public Bus', 'Train', 'Motopets', 'Cars'],
		correctAnswer: 2,
	},

	//question 6
	{
		question: "What is Vietnam's tradition garment?",
		answers: ['Cheongsam', 'Kimono', 'Salong', 'AoDai'],
		correctAnswer: 3,
	},

	//question 7
	{
		question: "Which beverage is most popular  in Vietnam?",
		answers: ['Cononut Juice', 'Green Tea', 'Coffee', 'Sugarcane Juice'],
		correctAnswer: 2,
	},



	
	];

	//variable to keep track of the answers
	var unanswered = 0;
	var correct = 0;
	var wrong = 0;
	var currentQuestion = 0;
	var intervalId;
	var userPick;

	$('.panel').hide();
	


	// ========================
	// DEFINE ALL THE FUNCTIONS
	// ========================

	//function to start the game
	function start(){
		console.log('restart the game');

		unanswered = 0;
		correct = 0;
		wrong = 0;	
		currentQuestion = 0;

		
	}

	function reset(){
		start();
		displayQuestion();

	}



	//function to start the countdown timer
	function startTimer(){
		$('.panel').show();

		var timeRemain = 7;

		function run(){
			intervalId = setInterval(decrement, 1000);
		}
		
    	function decrement() {
			timeRemain--;
			$("#timeRemain").html(timeRemain);
			if (timeRemain === 0) {
				$('#timeRemain').html('&nbsp;');
				stop();
				timeUp();
			}
			
    	}
    	function stop() {
			clearInterval(intervalId);
    	}
    run();
	}

	//function to display the questions
	function displayQuestion() {
		console.log('displayQuestion start')
		
		//first have to hide the startButton and displayAnswer 
		$('#startButton').hide();
		$('#displayAnswer').hide();
		$('#resetButton').hide();
		


		//if there is no question left then show the result div
		if (currentQuestion === allQuestions.length){
			result();
		}
		//if there are questions havent been asked then do the following...
		else if(currentQuestion < allQuestions.length){

			//display the time and start the 'startTimer' function with 20 seconds count down
			$('#timeRemain').show();
			
			startTimer();

			//show the question being asked and the multipleChoice
			$('#questionAsk').show();
			$('#multipleChoice').show();

			//generate the question
			$('#questionAsk').html(allQuestions[currentQuestion].question);

			//generate the 4 multiple choices
			$('#zero').html(allQuestions[currentQuestion].answers[0]);
			$('#one').html(allQuestions[currentQuestion].answers[1]);
			$('#two').html(allQuestions[currentQuestion].answers[2]);
			$('#three').html(allQuestions[currentQuestion].answers[3]);
		}
		
	}

	//function to display the answer after user pick an option in the multiple choices
	function checkAnswer() {
		console.log('checkAnswer function start')
		//hide the multiple choice
		$('#questionAsk').show();
		$('#multipleChoice').hide();
		
		//stop the timer
		clearInterval(intervalId);
		//temporary hide the timer
		$('#timeRemain').html("&nbsp;");

		//then check the answer user picked
		//if the answer is right
		


		if (userPick === allQuestions[currentQuestion].correctAnswer){
			console.log(userPick);
			console.log(allQuestions[currentQuestion].correctAnswer);
			console.log('you are right');


			//run the right answer function
			rightChoice();
		}
		//if the answer is wrong
		else {
			console.log(userPick);
			console.log(allQuestions[currentQuestion].correctAnswer);
			console.log('you are wrong');
			//run the wrong answer function
			incorrect();
		}

	}

	//function run when user pick the correct answer
	function rightChoice() {
		console.log('rightChoice functions start')
		//show the displayAnswer pannel
		$('#questionAsk').show();
		$('#displayAnswer').show();
		//hide the multiple choice pannel
		$('#multipleChoice').hide();

		//increase the correctAnswer
		correct++;
		//show the correct answer in the displayAnswer div
		$('#displayAnswer').html('<h2>You are correct</h2>');

		//show the result for 5 second then move on to the next question
		currentQuestion++;
		setTimeout (function(){
			displayQuestion()
		}, 1000);
		
	}

	//function run when user pick the wrong answer
	function incorrect() {
		console.log('wrongAnswer function start')
		
		//show the displayAnswer pannel
		$('#questionAsk').show();
		$('#displayAnswer').show();
		//hide the multiple choice pannel
		$('#multipleChoice').hide();

		//increase the wrong answer
		wrong++;
		//show the correct answer in the displayAnswer div
		$('#displayAnswer').html('<h2>You are wrong</h2><p>Correct answer is: '  + allQuestions[currentQuestion].answers[allQuestions[currentQuestion].correctAnswer] + '</p>');

		//show the result for 5 second then move on to the next question
		currentQuestion++;
		setTimeout (function(){
			displayQuestion()
		}, 1000);
		
	}


	//function run when user dont pick an answer within 20 seconds
	function timeUp(){
		console.log('timeUp function start')
		
		//show the displayAnswer pannel
		$('#displayAnswer').show();
		//hide the multiple choice pannel
		$('#multipleChoice').hide();

		//increase the correctAnswer
		unanswered++;
		//show the correct answer in the displayAnswer div
		$('#displayAnswer').html('<h2>Time is up!</h2><p>Correct answer is: '  + allQuestions[currentQuestion].answers[allQuestions[currentQuestion].correctAnswer] + '</p>');

		//show the result for 5 second then move on to the next question
		setTimeout (function(){
			displayQuestion()
		}, 1000);
		currentQuestion++;

	}

	//function to display the result
	function result(){
		console.log('result function start')
		//hide the multiple choice pannel
		$('#questionAsk').html('&nbsp;')
		$('#multipleChoice').hide();
		//show the result in the displayAnswer pannel 
		$('#displayAnswer').show();
		$('#resetButton').show();


		//temporary hide the timer
		$('#timeRemain').html("&nbsp;");

		//generate the result pannel
		$('#displayAnswer').html("<h3>Here's how you did!</h3><p>Correct Answer: " + correct + "</p><p>Wrong Answer: " + wrong + "</p><p>Unanswered: " + unanswered + "</p>");
		$('#questionAsk').html('Result')
	}

	// ==============
	// ONCLICK ACTION
	// ==============

	//start the game
	
	//start();

	$('#startButton').on('click', function(){

		start();
		displayQuestion();



	});

	$('.option').on('click', function(){
		userPick = parseInt($(this).attr('value'));
		checkAnswer();

	});

	$('#resetButton').on('click', function(){
		console.log('reset button start')
		reset();
	});


});












// We need to keep track of correct, incorrect and unanswered questions
//2.set timeRemain counting down from 20 second (using setTimeout???)
//3. Create function to display each question in the DOM 
//4. create function to display 4 different optional answers
//5. create function to check if the user's answer is right
//6. if the answer is correct ==> display CORRECT! and matching 'right' image with the question then move to the next question after 5secons
//7. if the answer is wrong ===> display WRONG! correct answer is :....... and matching 'wrong' image with question then move to the next question after 5secons 
//8. if the user doesnt answer the question within 30 seconds ===> display"Time is up" and 'correct answer is' and matching 'right' image then move to the next question after 5seconds
//9. create a function to display the result when user answer all the questions
//The result should keep track of number of correct and wrong answer (correct++ and wrong++) and a button to restart the game

