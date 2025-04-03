import React from "react";
import Match from "./Match";

export default function Round({ singleRoud, idx }) {
  const { name, matches, date } = singleRoud;
  return (
    <div className={`round round-x${idx + 1}`}>
      {/* Round details, data */}
      <div className='round-details'>
        {name}
        <br />
        <span className='date'>{new Date(date).toLocaleDateString()}</span>
      </div>
      {/* Iterator over each round matches */}
      {matches.map((singleMatch, idx) => {
        const { teams, result } = singleMatch;
        return (
          <Match
            teams={teams}
            result={result}
            key={idx}
          />
        );
      })}
    </div>
  );
}
