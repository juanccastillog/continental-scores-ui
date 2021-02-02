
import React from 'react';
import styles from './table.module.less';
import constants from '../../constants';

const nameHeader = 'Player';

export const PlayersColumn = ({ players }) =>
  <div className={styles.playerscolumn}>
    <div className={styles.nameheader}>{nameHeader}</div>
    {
      players.map(
        player =>
          <div className={styles.playername} key={player}>{player}</div>
      )
    }
  </div>

export const DealsColumns = ({ deals, onChangeScore }) =>
  <div className={styles.dealscontainer}>
    {
      constants.dealsHeaders.map(
        (dealHeader, j) =>
          <div key={dealHeader} className={styles.dealcolumn}>
            <div className={styles.dealheader}>{dealHeader}</div>
            {
              (deals && deals[j] &&
                deals[j].map(
                  (playerDeal) =>
                    <li key={playerDeal.name}>
                      <input type="number" value={playerDeal.value} onChange={e => onChangeScore({ dealIndex: j, name: playerDeal.name, value: e.target.value })} />
                    </li>
                )) || null
            }
          </div>
      )
    }
  </div>

export const ScoreSumsColumn = ({ totals }) =>
  <div className={styles.resultcolumn}>
    <div className={styles.dealheader}>{constants.resultsHeaders[0]}</div>
    {
      totals.map(total =>
        <div key={total.name}>
          {total.scoreSum}
        </div>)
    }
  </div>

export const EarningSumsColumn = ({ earnings }) =>
  <div className={styles.resultcolumn}>
    <div className={styles.dealheader}>{constants.resultsHeaders[1]}</div>
    {
      earnings.map(earning =>
        <div key={earning.name}>
          {earning.earningSum}
        </div>)
    }
  </div>
