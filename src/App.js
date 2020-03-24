import React from 'react';

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
  const dealsHeaders = ['2t', '1t 1st', '2st', '3t', '2t 1st', '2st 1t', '3s', 'sum', '$'];
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
        dealsHeaders.map(
          (dealHeader, j) =>
            <div key={dealHeader} className="dealcolumn">
              <div className="dealheader">{dealHeader}</div>
              {
                deals && deals[j] &&
                deals[j].map(
                  (playerDeal) =>
                    <li className="points" key={playerDeal.name}>
                      <input type="text" pattern="[0-9]*" value={playerDeal.points} />
                    </li>
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

const App = () => {
  const [scores, setScores] = React.useState([]);
  const onAddName = (name) => {
    setScores(scores.concat({ name, deals: ['', '', '', '', '', '', ''] }));
  }
  return (
    <React.Fragment>
      <AddNameForm label="Name" onAddName={onAddName} />
      <Table scores={scores} />
    </React.Fragment>
  );
}

export default App;
