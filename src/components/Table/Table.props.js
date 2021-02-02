const getNumber = (typed) => typed ? parseInt(typed, 10) : 0;

const getPlayersDealsAndResults = (scores, winnerNames,
  {
    dealEarnings,
    BestScoreEarning,
  }
) => {

  const scoreSums = scores.map(score => {
    return {
      name: score.name,
      scoreSum: score.deals.reduce((sum, currentDeal) => sum + (currentDeal.isSet ? currentDeal.score : 0), 0),
    }
  });
  const totalScoreWinner = scoreSums.length > 0 && scoreSums.reduce((currentWinner, currentResult) =>
    currentResult.scoreSum < currentWinner.scoreSum ? currentResult : currentWinner);

  const earningSums = scores.map(score => {
    return {
      name: score.name,
      earningSum: winnerNames.reduce((sum, currentWinnerName, currentIndex) =>
        currentWinnerName !== null ?
        (sum + ((currentWinnerName === score.name) ? dealEarnings[currentIndex] * (scores.length - 1) : - dealEarnings[currentIndex]))
        : sum, 0) +
        ((score.name === totalScoreWinner.name) ? BestScoreEarning * (scores.length - 1) : -BestScoreEarning)
    }
  });

  const deals = scores[0]?.deals?.map(
    (row0colj, j) => scores.map(score => ({ name: score.name, value: score.deals[j].isSet ? score.deals[j].score : '' }))
  );
  const players = scores.map(score => score.name);
  return { players, deals, scoreSums, earningSums };
}


const getModifiedScores = ({ dealIndex, name, value }, scores) =>
  scores.map(
    score =>
      score.name === name ?
        {
          ...score,
          deals: score.deals.map(
            (deal, j) => (j === dealIndex) ? { isSet: value !== '', score: getNumber(value) } : deal
          ),
        } : score
  );

export const getTableProps = ({
  scoresSetup: {
    scores,
    setScores,
  },
  winnersSetup: {
    winners,
    setWinners,
  },
  earningsSetup
}) => {
  const handleChangeScore = (change) => {
    const newScores = getModifiedScores(change, scores);
    setScores(newScores);
    if (change.value === '0') {// TODO for now assuming change.name is the winner of the change.dealIndex round
      handleChangeWinner(change.name, change.dealIndex);
    }
  };
  const handleChangeWinner = (newWinner, roundIndex) => setWinners(winners.map((winner, i) => i === roundIndex ? newWinner : winner));
  const { players, deals, scoreSums, earningSums } = getPlayersDealsAndResults(scores, winners, earningsSetup);
  return { players, deals, scoreSums, earningSums, handleChangeScore, handleChangeWinner };
}