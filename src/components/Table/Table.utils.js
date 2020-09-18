const getPlayersDealsAndResults = (scores) => {
  const deals = scores[0] && scores[0].deals && scores[0].deals.map(
    (row0colj, j) => scores.map(row => ({ name: row.name, points: row.deals[j] }))
  );
  const players = scores.map(score => score.name);
  const results = scores.map(score => ({name: score.name, total: score.sum, earning: score.earning}))
  return {players, deals, results};
}

const utils = {
  getPlayersDealsAndResults,
}

export default utils;