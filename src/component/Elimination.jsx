import React, { useEffect, useState } from "react";
import getRounds from "../util/elimination";
import Round from "./Round";
import { useParams } from "react-router-dom";

// ! The bracket will be generated on the client-side
export default function Elimination() {
  const { tournamentId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(
        `http://0.0.0.0:8080/getTournament/${parseInt(tournamentId)}`
      );
      let jsdData = await data.json();
      setData(jsdData);
    }
    fetchData();
  }, [tournamentId]);

  const allRounds = getRounds(data);
  const rounds = allRounds.slice(0, -1);
  const champion = allRounds.at(-1);
  return (
    <>
      <section id='bracket'>
        <div className='wrapperElimination'>
          {/* Want i attend to have */}
          {rounds.map((singleRoud, idx) => {
            return (
              <Round
                singleRoud={singleRoud}
                idx={idx}
                key={idx}
              />
            );
          })}

          {champion && (
            <div className={`round`}>
              <div className='round-details'>
                {champion.name}
                <br />
                <span className='date'></span>
              </div>
              <ul className='matchup'>
                <li className='team'>{champion.team}</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
