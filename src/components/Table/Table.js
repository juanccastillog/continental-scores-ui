import React from 'react';
import { PlayersColumn, DealsColumns, ScoreSumsColumn, EarningSumsColumn } from './Table.subcomponents';
import styleClasses from './table.module.less'

export const Table = ({ players, deals, scoreSums, earningSums, onChangeScore }) => {
  return (
    <div className={styleClasses.table}>
      <PlayersColumn players={players} />
      <DealsColumns deals={deals} onChangeScore={onChangeScore} />
      <ScoreSumsColumn totals={scoreSums} />
      <EarningSumsColumn earnings={earningSums} />
    </div>
  )
}