    const score = JSON.parse(localStorage.getItem('savedScore')) || { wins: 0, loses: 0, ties: 0 };

    document.querySelector('.stone').addEventListener('click' , () => {
        action('Stone');
    });

    document.querySelector('.paper').addEventListener('click' , () => {
        action('Paper');
    });

    document.querySelector('.scissor').addEventListener('click' , () => {
        action('Scissor');
    });

    document.querySelector('.resetButton').addEventListener('click' , () => {
        reset();
    });

    document.querySelector('.autoButton').addEventListener('click' , () => {
        autoPlay();
    });

    document.body.addEventListener('keydown' , (event) => {
        if(event.key === 'r'){
            action('Stone');
        }
        else if(event.key === 'p'){
            action('Paper');
        }
        else if(event.key === 's'){
            action('Scissor');
        }
    });
    

    let isAutoPlaying = false;
    let intervalId;

    function autoPlay(){

        if(!isAutoPlaying){
            intervalId = setInterval( function () {
                const yourChoice = pickMove();
                action(yourChoice);
                } , 1000
            );

            isAutoPlaying = true;

            document.querySelector('.autoButton').innerHTML = 'Stop Playing';
        }

        else{
            clearInterval(intervalId);
            isAutoPlaying = false;

            document.querySelector('.autoButton').innerHTML = 'Auto Play'
        }
        
        
    }

    function action(yourChoice) {

        const computerChoice = pickMove();
        let result;

        if (yourChoice === 'Stone') {
            if (computerChoice === 'Stone') {
                result = 'Tie'
            }
            else if (computerChoice === 'Paper') {
                result = 'You lose'
            }
            else {
                result = 'You win'
            }
        }

        else if (yourChoice === 'Paper') {
            if (computerChoice === 'Paper') {
                result = 'Tie'
            }
            else if (computerChoice === 'Scissor') {
                result = 'You lose'
            }
            else {
                result = 'You win'
            }
        }

        else {
            if (computerChoice === 'Scissor') {
                result = 'Tie'
            }
            else if (computerChoice === 'Stone') {
                result = 'You lose'
            }
            else {
                result = 'You win'
            }
        }

        document.querySelector('.result').innerHTML = `${result}`;

        document.querySelector('.choice').innerHTML = `You <img src="${yourChoice}-emoji.png"> <img src="${computerChoice}-emoji.png"> Computer`;

        updateScore(result);

    }


    function pickMove() {

        // let randomVariable = Math.random();

        // if (randomVariable < 1 / 3) {
        //     computerChoice = 'Stone'
        // }
        // else if (randomVariable <= 1 / 3 && randomVariable < 2 / 3) {
        //     computerChoice = 'Paper'
        // }
        // else {
        //     computerChoice = 'Scissor'
        // }

        // return computerChoice;

        const possibleMoves = ['Stone', 'Paper', 'Scissor'];
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);

        return possibleMoves[randomIndex];

    }

    function updateScore(result) {

        if (result === 'You win') {
            score.wins++;
        }

        else if (result === 'You lose') {
            score.loses++;
        }

        else {
            score.ties++;
        }

        displayScore();

        localStorage.setItem('savedScore', JSON.stringify(score));
    }

    function reset() {
        score.wins = score.loses = score.ties = 0;
        displayScore();

        document.querySelector('.result').innerHTML = '';

        document.querySelector('.choice').innerHTML = '';

        localStorage.removeItem('savedScore');
    }

    function displayScore() {
        document.querySelector('.score').innerHTML = `wins = ${score.wins}&nbsp;&nbsp;&nbsp;&nbsp;  
        loses = ${score.loses}&nbsp;&nbsp;&nbsp;&nbsp;
        ties = ${score.ties}`;
    }

    displayScore();