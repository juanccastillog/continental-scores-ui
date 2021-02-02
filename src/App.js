import React, { useState } from 'react';
import { AddNameForm } from './components/AddNameForm/AddNameForm';
import { Table } from './components/Table/Table';
import { AppSubComp } from './App.subcomonents';
import { getTableProps } from './components/Table/Table.props';



const App = () => {
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([null, null, null, null, null, null, null]);
  const dealEarnings = [500, 1000, 1500, 2000, 2500, 3000, 3500];
  const BestScoreEarning = 5000;
  const {
    players,
    deals,
    scoreSums,
    earningSums,
    handleChangeScore,
    handleChangeWinner
  } = getTableProps({
    scoresSetup: {
      scores,
      setScores,
    },
    winnersSetup: {
      winners,
      setWinners,
    },
    earningsSetup: {
      dealEarnings,
      BestScoreEarning,
    }
  });
  const onAddName = (name) => {
    setScores(scores.concat({
      name,
      deals: [
        { isSet: false, score: 0 },
        { isSet: false, score: 0 },
        { isSet: false, score: 0 },
        { isSet: false, score: 0 },
        { isSet: false, score: 0 },
        { isSet: false, score: 0 },
        { isSet: false, score: 0 }
      ]
    }));
  }

  return (
    <AppSubComp.AppContainer>
      <AddNameForm label="Name" onAddName={onAddName} />
      <Table players={players} deals={deals} scoreSums={scoreSums} earningSums={earningSums} onChangeScore={handleChangeScore} onChangeWinner={handleChangeWinner} />
    </AppSubComp.AppContainer>
  );
}

export default App;
