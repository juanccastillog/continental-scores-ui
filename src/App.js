import React from 'react';
import constants from './constants';
import { AddNameForm } from './components/AddNameForm';
import { Table } from './components/Table';
import { AppSubComp } from './App.subcomonents';

const getNumber = (typed) => typed ? parseInt(typed) : 0;

const calculateWinnerByDeal = (scores, dealIndex) => {
  let dealCompleted = true;
  let dealMin = scores[0].dealValues[dealIndex];
  let dealWinner = scores[0].name;
  scores.forEach(playerScore => {
    if (dealCompleted) {
      if (playerScore.deals[dealIndex] === '') {
        dealCompleted = false;
      }
      else {
        if(playerScore.dealValues[dealIndex] < dealMin){
          dealMin = playerScore.deals[dealIndex];
          dealWinner = playerScore.name;                 
        }        
      }
    }
  });
  return dealCompleted ? dealWinner : null;
}

const calculateEarning = scores => {
  const winners = constants.dealsHeaders.map((...mapParameters) => calculateWinnerByDeal(scores, mapParameters[1]));
  const scoresWithDealsEarnings = scores.map(
    playerScore => (
      {
        ...playerScore,
        sum: playerScore.dealValues.reduce(
          ((acc, currentValue, index) =>
            winners[index] ? acc + parseInt(currentValue) : acc),
          0
        ),
        earning: playerScore.dealValues.reduce(
          (acc, s, index) =>
            winners[index] ?
              (winners[index] === playerScore.name ? 
                acc + (constants.dealsEarnings[index] * (scores.length - 1)) : 
                acc - constants.dealsEarnings[index]) :
            acc,    
          0
        ),
      })
  );
  const sumWinner = scoresWithDealsEarnings.reduce(
    ((winnerPlayer, playerScore) =>
     ( playerScore.sum < winnerPlayer.sum ) ? playerScore : winnerPlayer  )
  );
  const newScores = scoresWithDealsEarnings.map(
    playerScore => (playerScore === sumWinner)? ({...playerScore, earning: playerScore.earning + constants.sumEarning * (scores.length - 1)}) : ({...playerScore, earning: playerScore.earning - constants.sumEarning })
  );
  console.log(newScores);
  return scoresWithDealsEarnings.map(
    playerScore => (playerScore === sumWinner)? ({...playerScore, earning: playerScore.earning + constants.sumEarning * (scores.length - 1)}) : ({...playerScore, earning: playerScore.earning - constants.sumEarning })
  );
}

const App = () => {
  const [scores, setScores] = React.useState([]);
  const onAddName = (name) => {
    setScores(scores.concat({ name, deals: ['', '', '', '', '', '', ''], dealValues: [0,0,0,0,0,0,0], sum: 0, earning: 0 }));
  }
  const handleChangeScore = (dealIndex, name, value) => {
    setScores(
      calculateEarning(scores.map(
        score =>
          score.name === name ?
            {
              ...score,
              deals: score.deals.map(
                (deal, j) => (j === dealIndex) ? value : deal
              ),
              dealValues: score.deals.map(
                (deal, j) => (j === dealIndex) ? getNumber(value) : getNumber(deal)
              ),
            } : score
      )
      ));
  };
  return (
    <AppSubComp.AppContainer>
      <AddNameForm label="Name" onAddName={onAddName} />
      <Table scores={scores} onChangeScore={handleChangeScore} />
    </AppSubComp.AppContainer>
  );
}

export default App;
