import React from "react";
import Elimination from "../component/Elimination";
import RoundRobin from "../component/RoundRobin";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
export default function Bracket() {
  // TODO: search for the desired tournament, display it's bracket by default.
  // TODO: display a navbar for bracket, settings.
  const { tournamentId } = useParams();
  return (
    <>
      {/* Based on the tournament type, render the bracket. */}
      <Elimination />
      <RoundRobin />
    </>
  );
}
