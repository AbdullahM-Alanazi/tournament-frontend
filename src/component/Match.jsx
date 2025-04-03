import React from "react";
import { isEmpty } from "../util/validateForm";

export default function Match({ teams, result }) {
  return (
    <ul className='matchup'>
      {teams.map((team, idx) => {
        let empty = isEmpty(team);
        return (
          <li
            className='team '
            key={idx}>
            {!empty ? team : "TBD"}
            <span className='score'>
              {result[idx] !== -1 ? result[idx] : ""}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
