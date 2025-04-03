import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getRounds from "../util/elimination";
import { isEmpty } from "../util/validateForm";
import Button from "@mui/material/Button";

export default function StudentSettings() {
  const { tournamentId } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
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
  //
  function handleChange(event, idx0, idx1, idx2) {
    const { name, value } = event.target;
    if (name === "teamName") {
      setData((preValue) => {
        let newValue = { ...preValue };
        newValue.teams[idx1][idx2] = value;
        return newValue;
      });
    } else {
      setData((preValue) => {
        let newValue = { ...preValue };
        newValue.results[idx0][idx1][idx2] = parseInt(value);
        return newValue;
      });
    }
  }
  const handleClick = async (e) => {
    // Update the data
    e.preventDefault();
    let res = await fetch(
      `http://0.0.0.0:8080/updateTournamen/${tournamentId}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      navigate("../bracket");
    }
  };
  return (
    <>
      <section id='bracket'>
        <div className='wrapperElimination'>
          {/* Want i attend to have */}
          {rounds.map((singleRoud, idx0) => {
            const { name, matches, date } = singleRoud;
            let flag = idx0 === 0;
            return (
              <div className={`round round-x${idx0 + 1}`}>
                {/* Round details, data */}
                <div className='round-details'>
                  {name}
                  <br />
                  <span className='date'>
                    {new Date(date).toLocaleDateString()}
                  </span>
                </div>
                {/* Iterator over each round matches */}
                {matches.map((singleMatch, idx1) => {
                  const { teams, result } = singleMatch;
                  return (
                    <ul className='matchup'>
                      {teams.map((team, idx2) => {
                        let empty = isEmpty(team);
                        return (
                          <li
                            className='team '
                            key={idx2}>
                            {flag && empty ? (
                              <input
                                type='text'
                                name='teamName'
                                placeholder={!empty ? team : "TBD"}
                                onBlur={(event) => {
                                  handleChange(event, idx0, idx1, idx2);
                                }}
                              />
                            ) : !empty ? (
                              team
                            ) : (
                              "TBD"
                            )}
                            <span>
                              {result[idx2] !== -1 ? result[idx2] : ""}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Button
          type='submit'
          // fullWidth
          color='primary'
          size='medium'
          variant='contained'
          onClick={(e) => handleClick(e)}
          sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </section>
    </>
  );
}
