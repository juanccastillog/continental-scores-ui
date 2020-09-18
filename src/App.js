import React, {useState} from 'react';
import { AddNameForm } from './components/AddNameForm/AddNameForm';
import { Table } from './components/Table/Table';
import { AppSubComp } from './App.subcomonents';
import { getTableProps } from './components/Table/Table.props';



const App = () => {
  const [scores, setScores] = useState([]);
  const { players, deals, results, handleChangeScore } = getTableProps({scores, setScores});
  console.log({ scores, players, deals, results, handleChangeScore });
  const onAddName = (name) => {
    setScores(scores.concat({ name, deals: [0,0,0,0,0,0,0]}));
  }

  return (
    <AppSubComp.AppContainer>
      <AddNameForm label="Name" onAddName={onAddName} />
      <Table players={players} deals={deals} results={results} onChangeScore={handleChangeScore} />
    </AppSubComp.AppContainer>
  );
}

export default App;
