import React from 'react';
import constants from './constants'

const AddNameForm = ({ label, onAddName }) => {

  const [name, setName] = React.useState('');
  const handleSubmit = (event) => {
    onAddName(name);
    setName('');
    event.preventDefault();
  }
  const handleChange = (event) => {
    setName(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {label}
        <input type="text" onChange={handleChange} value={name} />
      </label>
    </form>
  );
}
const getPlayersAndDeals = (scoresP) => {
  const deals = scoresP[0] && scoresP[0].deals && scoresP[0].deals.map(
    (row0colj, j) => scoresP.map(row => ({ name: row.name, points: row.deals[j] }))
  );
  const players = scoresP.map(score => score.name);
  return [players, deals];
}


const Table = ({ scores, onChangeScore }) => {
  const [players, deals] = getPlayersAndDeals(scores);
  const nameHeader = 'Name'
  const playersColumn =
    <div className="playerscolumn">
      <div className="nameheader">{nameHeader}</div>
      {
        players.map(
          player =>
            <div className="playername" key={player}>{player}</div>
        )
      }
    </div>
  const dealsColumns =
    <div className="dealscontainer">
      {
        constants.dealsHeaders.map(
          (dealHeader, j) =>
            <div key={dealHeader} className="dealcolumn">
              <div className="dealheader">{dealHeader}</div>
              {
                (deals && deals[j] &&
                  deals[j].map(
                    (playerDeal) =>
                      <li className="points" key={playerDeal.name}>
                        <input type="text" pattern="[0-9]*" value={playerDeal.points} onChange={e => onChangeScore(j, playerDeal.name, e.target.value)} />
                      </li>
                  )) ||
                (
                  dealHeader === 'sum' ?
                    scores.map( playerScore => 
                      <li className="points" key={playerScore.name}>
                        {playerScore.sum}                        
                      </li>
                    ) :
                  dealHeader === '$' ?
                    scores.map( playerScore =>
                      <li className="points" key={playerScore.name}>
                        {playerScore.earning}
                      </li>
                    ) : null
                )
              }
            </div>
        )
      }
    </div>
  return (
    <div className="table">
      {playersColumn}
      {dealsColumns}
    </div>
  )
}

const calculateWinnerByDeal = (scores, dealIndex) => {
  let dealCompleted = true;
  let dealMin = scores[0].deals[dealIndex];
  let dealWinner = scores[0].name;
  scores.forEach(playerScore => {
    if (dealCompleted) {
      if (playerScore.deals[dealIndex] === '') {
        dealCompleted = false;
      }
      else {
        dealMin = (playerScore.deals[dealIndex] < dealMin) ? playerScore.deals[dealIndex] : dealMin;
        dealWinner = playerScore.name;
      }
    }
  });
  return dealCompleted ? dealWinner : null;
}

const calculateEarning = scores => {
  const winners = constants.dealsHeaders.map((...mapParameters) => calculateWinnerByDeal(scores, mapParameters[1]));
  scores.map(
    playerScore => (
      {
        ...playerScore,
        sum: playerScore.deals.reduce(
          ((acc, currentValue, index) =>
            winners[index] ? acc + currentValue : acc),
          0
        ),
        earning: playerScore.deals.reduce(
          ((acc, s, index) =>
            winners[index] === playerScore.name ? acc + constants.dealsEarnings[index] * scores.length : acc - constants.dealsEarnings[index]),
          0
        ),
      })
  );
}

const App = () => {
  const [scores, setScores] = React.useState([]);
  const onAddName = (name) => {
    setScores(scores.concat({ name, deals: ['', '', '', '', '', '', ''], sum: 0, earning: 0 }));
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
              )
            } : score
      )
      ));
  };
  return (
    <React.Fragment>
      <AddNameForm label="Name" onAddName={onAddName} />
      <Table scores={scores} onChangeScore={handleChangeScore} />
    </React.Fragment>
  );
}

export default App;
