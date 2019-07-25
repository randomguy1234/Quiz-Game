/******
 * Quiz game Instructions
 * 
 * 1/ build function constructor (Question) to describe question, should have:
 *  a/ question 
 *  b/ choices of answers
 *  c/ correct answer(recommend: use numbers)
 * 
 * 2/ create a few questions using constructor
 * 
 * 3/ store them in array
 * 
 * 4/ select 1 random Q with choices of answer and print it to console(recommend: write function)
 * 
 * 5/ 'prompt' user for correct answer
 * 
 * 6/ check if answer is correct and print to console result(recommend: write another function)
 * 
 * 7/ make your code private
 * 
 * 
 * --Challenge Mode---
 * 
 * 8/ after result is displayed, display next random Q(recommend: write another function and call it)
 * 
 * 9/ create way to end game by entering 'exit' instead of answer
 * 
 * 10/ track user score, add 1 point to score (dont have to use closure here)
 * 
 * 11/ display current score(create another function)
 */

(function() {
    //everything is wrapped in a IIFE(immediately invoked function expression)
    let qBank, questions, answerChoices, correctAnswers, input, num, stillPlaying, score;
    
    qBank = [];             //array used to easily populate other arrays, may not need other arrays, length of all arrays are same
    questions = [];         //array used to store questions
    answerChoices = [];     //array used to store range of answers
    correctAnswers = [];    //array used to store correct answers
    stillPlaying = true;    //checks if user enters the 'exit' word
    score = 0;              //player's score

    //add questions using the constructor to the question bank
    qBank.push(new Question('Q: What is the best meal for college students?',   ['catered food','pizza','subway'],      'pizza'));
    qBank.push(new Question('Q: Who are you?',      ['AI','human','animal', 'alien'],       'human'));
    qBank.push(new Question('Q: Which animal is the best pet?',     ['dog','cat','ferret','rabbit','duck'],     'dog'));
    qBank.push(new Question('Q: Why do birds suddenly appear everytime you are near?',      ['you naturally attract birds'
    ,'you walk around with birdfeed all the time','you are artistically beautiful/handsome', 
    'just like me they long to be close to you', 'someone cursed me with this','it\'s just a coincidence...probably'],      'just like me they long to be close to you'));
    qBank.push(new Question('Q: How should you respond if a stranger approaches you with a weapon that causes instant death?',
    ['RUN!','FIGHT!'],      'RUN!'));
    qBank.push(new Question('Q: Where are you going?',      ['school','work', 'home','another country',
    'another city','vacation','bus/train'],     'home'));
    qBank.push(new Question('Q: When would you like to obtain a random superpower?',    ['now','later', 'at a random point in time',
    'whenever is most convinent for you','next week','tomorrow','next year','whenever I spend $100 or more on 1 item'],     'whenever I spend $100 or more on 1 item'));
    
    //seperates answer range, questions, and correct answers into different arrays; may not need to do this
    for(let i =0; i<qBank.length; i++){
        questions.push(qBank[i].question);
        answerChoices.push(qBank[i].possAnswers);
        correctAnswers.push(qBank[i].corrAnswer);
    }

    //constantly asks random question and checks answer until user enters 'exit'
    while(stillPlaying)
    {
        randomQ();
        isCorrect();
    }

    //function constructor
    function Question(question, possAnswers, corrAnswer) {
        this.question = question;
        this.possAnswers = possAnswers;
        this.corrAnswer = corrAnswer;
    }
    
    //generates random question and displays it to console
    function randomQ(){
        num = Math.floor(Math.random()*qBank.length+1);     //generates random number from 1-7
        console.log(questions[num-1]);      //displays question in console according to array index
        
        for(let i =0; i < answerChoices[num-1].length; i++){
            console.log(i+': '+answerChoices[num-1][i]);    //displays all options for particular question, each value in array is an array
        }

        input = prompt('What is your answer to the question?'
        +' Choose an answer based on the number next to each option. '+
        'Enter exit or EXIT to end the game.');
        
        //how to end the game
        if(input === 'exit' || input === 'EXIT')
        {
            stillPlaying = false;
        }    
    }
    
    //checks if question was answered correctly and displays approiate response
    function isCorrect(){
        let temp;   //used to keep track of the correct answer index
        for (let i =0; i<answerChoices[num-1].length; i++)
        {
            if (answerChoices[num-1][i] === correctAnswers[num-1]){
                temp=i;
            }
        }
        
        if (parseInt(input,10) === temp){   //input = index of correct answer
            console.log('V- Correct answer -V');
            score++;
        }
        else if (parseInt(input, 10) < 7 && parseInt(input, 10) < answerChoices[num-1].length){     //input is any of the other choices, wrong
            console.log('X- Sorry. Wrong answer. -X');
            score--;
        }
        else if(input === 'exit' || input === 'EXIT'){      
            console.log('Thank you for playing.');
            console.log('---Your final score is: '+score+'.---');
        }
        else{
            console.log('You entered the wrong value');     //input is anything but a number
        }

        //doesnt appear if user quits game
        if(stillPlaying){       
            console.log('----Your current score is: '+score+'.----');
        }
    }
})();
