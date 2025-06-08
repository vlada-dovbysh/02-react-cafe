import { useState } from 'react';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import type { Votes, VoteType } from '../../types/votes';
import VoteOptions from '../VoteOptions/VoteOptions'
import Notification from "../Notification/Notification";
import VoteStats from "../VoteStats/VoteStats";


function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  function handleVote(type: VoteType) {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  }

  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  }

  const totalVotes = votes.bad + votes.good + votes.neutral;
  const positiveRate = totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);
  const canReset = totalVotes > 0;

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={canReset}
        />
        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}

export default App;
