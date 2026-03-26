

let score =JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    function resetScore(){ /*to reset the score and stop autoplay */
      clearInterval(intervalId);
      isautoplay = false;

      score.wins=0;
      score.losses=0;
      score.ties=0;

      localStorage.removeItem('score');
      scoreupdate();
    } 


    document.querySelector('.js-button-rock').addEventListener('click',()=>{
      playgame('rock')
    })

    document.querySelector('.js-button-paper').addEventListener('click',()=>{
      playgame('paper')
    })
    document.querySelector('.js-button-scissor').addEventListener('click',()=>{
      playgame('scissor')
    })


    document.body.addEventListener('keydown',(event)=>{
      if(event.key==='ArrowLeft'){
        playgame('rock')
      }
      else if(event.key === 'ArrowUp'){
        playgame('paper')
      }
      else if(event.key === 'ArrowRight'){
        playgame('scissor')
      }
    })
    scoreupdate();

    let isautoplay = false;
    let intervalId;

  function autoplay(){
    if (!isautoplay){
      intervalId = setInterval (()=>{
      const playerMove = pickComputerMove();
      playgame(playerMove);
    },1000);
    isautoplay = true;
    }
    else{
      clearInterval (intervalId);
      isautoplay = false;
    }
  }
   
   
  function playgame(playerMove){
      const randomNum = Math.random();

    let computerMove = pickComputerMove() ;
        

    let result = '';

    if (playerMove === computerMove){
      result = 'Tie';
    }else if ((playerMove === 'rock' && computerMove === 'scissor')||
    (playerMove === 'paper'&& computerMove === 'rock')||(playerMove === 'scissor'&& computerMove === 'paper'))
    {
      result = 'You win';
    }else {
      result = 'You lose';
    }
    
    if (result === 'You win'){
      score.wins +=1;
    }else if (result === 'You lose'){
      score.losses +=1;
    }else if(result === 'Tie'){
      score.ties +=1;
    }

     document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML =` You
      <img src="images/${playerMove}-emoji.png" class="game-icon">
      <img src="images/${computerMove}-emoji.png" class="game-icon">
      Computer` ;


        scoreupdate();

      console.log(localStorage.setItem('score',JSON.stringify(score))); 

    console.log(result);


  }

  function scoreupdate(){ /* to update score on the screen for every round */
      document.querySelector('.js-score').innerHTML =` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
     
  }

    function pickComputerMove() {
      const randomNumber = Math.random();

      let computerMove = '';

      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
      } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissor';
      }

      return computerMove;
    }


    

