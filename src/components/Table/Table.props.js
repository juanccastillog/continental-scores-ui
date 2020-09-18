import constants from '../../constants';

const getNumber = (typed) => typed ? parseInt(typed, 10) : 0;

const getPlayersAndDeals = (scores) => {
  const deals = scores[0] && scores[0].deals && scores[0].deals.map(
    (row0colj, j) => scores.map(row => ({ name: row.name, value: row.deals[j] }))
  );
  const players = scores.map(score => score.name);
  return { players, deals };
}

const getDealWinnerName = (deal) =>
  deal.reduce((acc, playerScore) => playerScore && acc && playerScore.value <= acc.value ? playerScore.name : acc && acc.name, null);

const getResults = (scores, deals) => (
  [] && scores.map(score => (
    {
      name: score.name,
      total: score.deals.reduce((acc, deal) => acc + deal),
      earning: score.deals.reduce((acc, deal, index) =>
        getDealWinnerName(deals[index]) === score.name ?
          acc + (constants.dealsEarnings[index] * (scores.length - 1)) :
          acc - constants.dealsEarnings[index], 0
      ),
    }))
);

const getModifiedScores = ({ dealIndex, name, value }, scores) =>
  scores.map(
    score =>
      score.name === name ?
        {
          ...score,
          deals: score.deals.map(
            (deal, j) => (j === dealIndex) ? getNumber(value) : deal
          ),
        } : score
  );

export const getTableProps = ({ scores, setScores }) => {
  const handleChangeScore = (change) => {
    setScores(getModifiedScores(change, scores));
    console.log('change', change);
    console.log('modified', getModifiedScores(change, scores));
  };
  const { players, deals } = getPlayersAndDeals(scores);
  const results = getResults(scores, deals);
  return { players, deals, results, handleChangeScore };
}