import React from 'react';
import { PlayersColumn, DealsColumns, TotalsColumn, EarningsColumn } from './Table.subcomponents';
import styleClasses from './table.module.less'

export const Table = ({ players, deals, results, onChangeScore }) => {
  const totals = results.map((result) => ({name: result.name, total: result.total}));
  console.log('totals', totals);
  const earnings = results.map((result) => ({name: result.name, earning: result.earning}));
  return (
    <div className={styleClasses.table}>
      <PlayersColumn players={players} />
      <DealsColumns deals={deals} onChangeScore={onChangeScore} />
      <TotalsColumn totals={totals} />
      <EarningsColumn earnings={earnings} />
    </div>
  )
}