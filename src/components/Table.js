import React from 'react';
import constants from '../constants';

const getPlayersAndDeals = (scoresP) => {
  const deals = scoresP[0] && scoresP[0].deals && scoresP[0].deals.map(
    (row0colj, j) => scoresP.map(row => ({ name: row.name, points: row.deals[j] }))
  );
  const players = scoresP.map(score => score.name);
  return [players, deals];
}


export const Table = ({ scores, onChangeScore }) => {
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
                        <input type="number" value={playerDeal.points} onChange={e => onChangeScore(j, playerDeal.name, e.target.value)} />
                      </li>
                  )) ||
                (
                  dealHeader === 'sum' ?
                    scores.map(playerScore =>
                      <li className="points" key={playerScore.name}>
                        {playerScore.sum}
                      </li>
                    ) :
                    dealHeader === '$' ?
                      scores.map(playerScore =>
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