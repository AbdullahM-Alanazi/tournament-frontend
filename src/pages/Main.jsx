import React, { useEffect, useState } from "react";
import TournamentDisplayer from "../component/Tournament";
// import { userContext } from "../App";
function Main() {
  // TODO: useEffect to retrieve tournaments data from the server.
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await fetch("http://0.0.0.0:8080/getTournaments");
      let jsdData = await data.json();
      setTournaments((preValue) => {
        return jsdData;
      });
    }
    fetchData();
  }, []);
  return (
    <>
      {tournaments.map((tournament, idx) => {
        return (
          <TournamentDisplayer
            tournament={tournament}
            key={idx}
          />
        );
      })}
    </>
  );
}

export default Main;
