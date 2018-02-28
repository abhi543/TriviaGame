

$(document).ready(function () {
    window.location.reload(true);
    // ==============================
    // THE QUESTIONS-ANSWERS OBJECTS
    // ==============================

    //put all the questions in an array
    var allQuestions = [
        // question 1
        {
            question: "How to say 'Hello' in Vietnamese?",
            alphabet: ['A', 'B', 'C', 'D'],
            answers: ['tam biet', 'khoe khong', 'cam on', 'xin chao'],
            correctAnswer: 3,
            pic: 'assets/images/xinchao.gif',
        },

        //question 2
        {
            question: "What is Vietnam's capital?",
            answers: ['Hannoi', 'Saigon', 'Nha Trang', 'Da Nang'],
            correctAnswer: 0,
            pic: 'assets/images/hannoi.jpg',
        },

        //question 3
        {
            question: "Which city is considered as Hawaii in Vietnam?",
            answers: ['Saigon', 'Long An', 'Can Tho', 'Nha Trang'],
            correctAnswer: 3,
            pic: 'assets/images/nhatrang.jpg',
        },

        //question 4
        {
            question: "Which one below is NOT breakfast in Vietnam?",
            answers: ['Catfish Stew', 'Pho', 'Beef Stew', 'Broken Rice'],
            correctAnswer: 0,
            pic: 'assets/images/cakho.gif',
        },

        //question 5
        {
            question: "Which is the most popular transporation method in Vietnam?",
            answers: ['Public Bus', 'Train', 'Motopets', 'Cars'],
            correctAnswer: 2,
            pic: 'assets/images/ketxe.jpg',
        },

        //question 6
        {
            question: "What is Vietnam's traditional garment?",
            answers: ['Cheongsam', 'Kimono', 'Salong', 'AoDai'],
            correctAnswer: 3,
            pic: 'assets/images/aoDai1.jpg',
        },

        //question 7
        {
            question: "Which beverage is most popular in Vietnam?",
            answers: ['Cononut', 'Green Tea', 'Coffee', 'Sugarcane'],
            correctAnswer: 2,
            pic: 'assets/images/caphe.gif',
        },

        //question 8
        {
            question: "What is Lunar New Year called in Vietnamese?",
            answers: ['Mua Xuan', 'Nam Moi', 'Vu Lang', 'Tet'],
            correctAnswer: 3,
            pic: 'assets/images/tet.jpg',
        },

        //question 9
        {
            question: "Which Viet dish is considered as salad burrito?",
            answers: ['Eggroll', 'Spring Roll', 'Banh Mi', 'Goi'],
            correctAnswer: 1,
            pic: 'assets/images/goiCuon.jpg',
        },

        //question 10
        {
            question: "What is Vietnam Calligraphy Called?",
            answers: ['Thu Phap', 'Viet Chu', 'Danh Van', 'Hoi Hoa'],
            correctAnswer: 0,
            pic: 'assets/images/thuphap.jpg',
        },

    ];

    //variable to keep track of the answers
    var unanswered = 0;
    var correct = 0;
    var wrong = 0;
    var currentQuestion = 0;
    var intervalId;
    var userPick;


    $('#questionDisplay').hide();
    $('#answerDisplay').hide();
    $('#resultBox').hide();

    // ==============
    // ONCLICK ACTION
    // ==============

    //start the games

    $('#start').on('click', function () {
        start();
        displayQuestion();
    });

    $('.multiChoice').on('click', function () {
        userPick = parseInt($(this).attr('value'));
        displayAnswer();

    });

    // =================
    // ALL THE FUNCTIONS
    // =================

    //function to start the game
    function start() {
        console.log('start the game');
        unanswered = 0;
        correct = 0;
        wrong = 0;
        currentQuestion = 0;

    }

    //function to start the countdown timer
	function startTimer(){
        $('.countDown').show();
        $('.countDown').html('&nbsp;');

		var timeRemain = 11;

		function run(){
			intervalId = setInterval(decrement, 1000);
		}
		
    	function decrement() {
			timeRemain--;
			$(".countDown").html(timeRemain);
			if (timeRemain === 0) {
				$('.countDown').html('0');
				stop();
				timeUp();
			}
			
    	}
    	function stop() {
			clearInterval(intervalId);
    	}
    run();
    }


    //function to animate process bar
    function createProgressbar(id, duration, callback) {
        // We select the div that we want to turn into a progressbar
        var progressbar = document.getElementById(id);
        progressbar.className = 'progressbar';
      
        // We create the div that changes width to show progress
        var progressbarinner = document.createElement('div');
        progressbarinner.className = 'inner';
      
        // Now we set the animation parameters
        progressbarinner.style.animationDuration = duration;
      
        // Eventually couple a callback
        if (typeof(callback) === 'function') {
          progressbarinner.addEventListener('animationend', callback);
        }
      
        // Append the progressbar to the main progressbardiv
        progressbar.appendChild(progressbarinner);
      
        // When everything is set up we start the animation
        progressbarinner.style.animationPlayState = 'running';
      }
      
      addEventListener('load', function() {
        createProgressbar('progressBar', '11s');
    });


     
    //function to display the questions
	function displayQuestion() {
        console.log('display the 4 questions');

        $('#box').hide();
        $('#answerDisplay').hide();
        $('body').css('background-image', 'url("assets/images/answerBg.jpg")');
        $("body").css({"background-position":"center center"})
        $('#questionDisplay').animate({height: 'toggle', opacity: '1'}, 1000);
		

		//if there is no question left then show the result
		if (currentQuestion === allQuestions.length){
			result();
		}
		//if there are questions havent been asked then do the following...
		else if(currentQuestion < allQuestions.length){

			//display the time and start the 'startTimer' function with 15 seconds count down
			startTimer();

			//show the question being asked and the multipleChoice
			$('.questionAsk').show();
            $('.multipleChoice').show();
            
            //generate question number
            $("#currentQuestion").html(currentQuestion + 1);
			//generate the question
			$('#questionAsk').html(allQuestions[currentQuestion].question);

			//generate the 4 multiple choices
			$('#one').html(allQuestions[currentQuestion].answers[0]);
			$('#two').html(allQuestions[currentQuestion].answers[1]);
			$('#three').html(allQuestions[currentQuestion].answers[2]);
			$('#four').html(allQuestions[currentQuestion].answers[3]);
		}
		
    }
  
    
    //function to display the answer after user pick an option in the multiple choices
	function displayAnswer() {
		console.log('displayAnswer function start')
		
		$('#questionDisplay').hide();
        $('#answerDisplay').animate({height: 'toggle', opacity: '1'}, 1000);
        $("#currentQuestion").html(currentQuestion + 1);
    
		//stop the timer
        clearInterval(intervalId);
        stop();
		

		//then check the answer user picked
		//if the answer is right
		if (userPick === allQuestions[currentQuestion].correctAnswer){
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
        $(".questionNum h4#currentQuestion").html(currentQuestion+1);
		

		//increase the correctAnswer
        correct++;
        

		//show the correct answer in the displayAnswer div
        $('#image-holder').html('<img class="img-responsive" src =' + allQuestions[currentQuestion].pic + '>');
        $('#rightOrWrong').html('<h3 class="checkAns">YOU ARE<br>'
                              + '<span class="boldTxt">RIGHT</span></h3>');

                // $('span.boldTxt').html("RIGHT").css("letter-spacing", "10px");
        $("#correctAns").html('<p>The correct <br class = "visible-md hidden-xs">answer is <br class="hidden-xs">'
                             + '<span style="text-transform: uppercase; color: #FE7900"; font-weight:600>' 
                             + allQuestions[currentQuestion].answers[allQuestions[currentQuestion].correctAnswer] 
                             + '</span></p>');
        
		//show the result for 3 second then move on to the next question
		currentQuestion++;
		setTimeout (function(){
			displayQuestion()
		}, 3000);
		
    }
    
    function incorrect() {
        console.log('wrongAnswer function start')
        $(".questionNum h4#currentQuestion").html(currentQuestion+1);
       
		//increase the correctAnswer
        wrong++;
        

		//show the correct answer in the displayAnswer div
        $('#image-holder').html('<img class="img-responsive" src =' + allQuestions[currentQuestion].pic + '>');
        $('#rightOrWrong').html('<h3 class="checkAns">YOU ARE<br>'
                              + '<span class="boldTxt"><span style="letter-spacing: 4px">WRONG</span></h3>');
        
        // $('span.boldTxt').html("WRONG");        
        $("#correctAns").html('<p>The correct <br class = "visible-md hidden-xs">answer is <br class="hidden-xs">'
                            + '<span style="text-transform: uppercase; color: #FE7900"; font-weight:600>' 
                            + allQuestions[currentQuestion].answers[allQuestions[currentQuestion].correctAnswer] 
                            + '</span></p>');
        
		//show the result for 3 second then move on to the next question
		currentQuestion++;
		setTimeout (function(){
			displayQuestion();
		}, 3000);
		
    }


    //function run when user dont pick an answer within 20 seconds
	function timeUp(){
        
        console.log('timeUp function start');
        $('#questionDisplay').hide();
        $('#answerDisplay').animate({height: 'toggle', opacity: '1'}, 1000);
        $(".questionNum h4#currentQuestion").html(currentQuestion + 1);
		
		//increase the correctAnswer
		unanswered++;
        //show the correct answer in the displayAnswer div
        $('#rightOrWrong').html("<h3 class='checkAns boldTxt'>TIME'S<br>UP</h3>");

        // $('.checkAns').html("<span class='boldTxt'>TIME'S UP</span>")
		$('#image-holder').html('<img class="img-responsive" src =' + allQuestions[currentQuestion].pic + '>');        
        $("#correctAns").html('<p>The correct <br class = "visible-md hidden-xs">answer is <br class="hidden-xs">'
                            + '<span style="text-transform: uppercase; color: #FE7900"; font-weight:600>' 
                            + allQuestions[currentQuestion].answers[allQuestions[currentQuestion].correctAnswer] 
                            + '</span></p>');

        //show the result for 3 second then move on to the next question
        currentQuestion++;
		setTimeout (function(){
			displayQuestion()
		}, 3000);
		

    }
    
    //function to display the result
	function result(){
		console.log('result function start')
		//hide the multiple choice pannel
		
        $('#questionDisplay').hide();
        $('#answerDisplay').hide();

        $('body').css('background-image', 'url("assets/images/halong1.jpg")');
        $('#resultBox').animate({width: 'toggle'}, 1000);

        //generate the result pannel
        $('#resultBox').html("<h4 class='result'>Correct Answer: &nbsp;<span style='font-size: 25px'>" + correct + "</span></h4>"
                           + "<h4 class='result'>Wrong Answer:&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size: 25px'>" + wrong +"</h4>"
                           + "<h4 class='result'>No Answer:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size: 25px'>" + unanswered +"</h4>"
                           + "<h1 id='resultTxt'>Re<br class='visible-xs visible-sm hidden-md'>sults</h1>"
                           + "<h4 id='again'>A<br>G<br>A<br>I<br>N<br><i class='fas fa-play fa-rotate-90 fa-sm'></i></h4>")
         
        $('#resultBox h4#again').on('click', function () {
        console.log('play again');
        reset();
        });
    }
    
    //function to reset the game
    function reset() {
        $('body').css('background-image', 'url("assets/images/startBg.jpg")');
        $('#box').animate({width: 'toggle'}, 1000);
        $('#questionDisplay').hide();
        $('#answerDisplay').hide();
        $('#resultBox').hide();


    }

});



// ==============================
//          Pseudo Code
// ==============================

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
