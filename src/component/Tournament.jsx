import React from "react";

import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function Tournament({ tournament }) {
  const { id, name, type, game, teams } = tournament;
  console.log(tournament);
  const naviagte = useNavigate();
  // TODO: for each tournament, there a unique ID. On click, naviagte to the desired page.
  return (
    <div
      className='tournaments-wrapper'
      onClick={() => naviagte(`tournaments/${id}}/bracket`)}>
      <div className='tournament-wrapper'>
        <div className='tournament-header'>
          <div>{name}</div>
          <div>In-prograss</div>
        </div>
        <div className='tournament-info'>
          <div className='tournament-nplayers'>
            <AiOutlineUser style={{ width: "32px", margin: 0 }} />
            {teams.length * 2}
          </div>
          <div className='tournament-type'>{type}</div>
          <div className='tournament-game'>{game}</div>
        </div>
      </div>
    </div>
  );
}
