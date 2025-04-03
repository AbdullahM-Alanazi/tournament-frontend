function getRounds(data) {
  let rounds = [];
  let teams = data.teams;
  for (let i = 0; i < data.results.length; i++) {
    let round = { name: `Round ${i + 1}`, matches: [] };
    let nextRoundTeams = [];
    for (let j = 0; j < data.results[i].length; j++) {
      let match = {
        teams: teams[j],
        result: data.results[i][j],
      };
      round.matches.push(match);
      let winningTeamIndex = data.results[i][j].indexOf(
        Math.max(...data.results[i][j])
      );
      nextRoundTeams.push(teams[j][winningTeamIndex]);
    }
    rounds.push(round);
    teams = chunkArray(nextRoundTeams, 2);
  }
  return rounds;
}

function chunkArray(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

let data = {
  teams: [
    ["Team 1", "Team 2"],
    ["Team 3", "Team 4"],
    ["Team 5", "Team 6"],
    ["Team 7", "Team 8"],
  ],
  results: [
    [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
    [
      [5, 6],
      [7, 8],
    ],
    [[9, 10]],
  ],
};
const rounds = getRounds(data);
const singleRound = rounds[0];
// * Destructuring
const { name, matches } = singleRound;
const singleMatch = matches[0];
console.log(matches);
const { teams, result } = singleMatch;
console.log(name, matches);
console.log(teams, result[1]);
//  <section id='bracket'>
//         <div className='wrapperElimination'>
//           {/* Round */}
//           <div className='round round-one current'>
//             {/* Round details, data */}
//             <div className='round-details'>
//               Round 1<br />
//               <span className='date'>March 16</span>
//             </div>
//             {/* * Match */}
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Duke Duke Duke Duke Duke Duke Duke
//                 <span className='score'>76</span>
//               </li>
//               <li className='team team-bottom'>
//                 Virginia<span className='score'>82</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Wake Forest<span className='score'>64</span>
//               </li>
//               <li className='team team-bottom'>
//                 Clemson<span className='score'>56</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 North Carolina Carolina<span className='score'>68</span>
//               </li>
//               <li className='team team-bottom'>
//                 Florida State<span className='score'>54</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 NC State<span className='score'>74</span>
//               </li>
//               <li className='team team-bottom'>
//                 Maryland<span className='score'>92</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Georgia Tech<span className='score'>78</span>
//               </li>
//               <li className='team team-bottom'>
//                 Georgia<span className='score'>80</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Auburn<span className='score'>64</span>
//               </li>
//               <li className='team team-bottom'>
//                 Florida<span className='score'>63</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Kentucky<span className='score'>70</span>
//               </li>
//               <li className='team team-bottom'>
//                 Alabama<span className='score'>59</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 Vanderbilt<span className='score'>64</span>
//               </li>
//               <li className='team team-bottom'>
//                 Gonzaga<span className='score'>68</span>
//               </li>
//             </ul>
//           </div>
//           {/* ** Round two */}
//           <div className='round round-two'>
//             <div className='round-details'>
//               Round 2<br />
//               <span className='date'>March 18</span>
//             </div>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//           </div>
//           <div className='round round-three'>
//             <div className='round-details'>
//               Round 3<br />
//               <span className='date'>March 22</span>
//             </div>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//             <ul className='matchup'>
//               <li className='team team-top'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//               <li className='team team-bottom'>
//                 &nbsp;<span className='score'>&nbsp;</span>
//               </li>
//             </ul>
//           </div>

//           {/* Want i attend to have */}
//           <div className='champion'>
//             <div className='final'>
//               <i className='fa fa-trophy'></i>
//               <div className='round-details'>
//                 championship <br />
//                 <span className='date'>March 30 </span>
//               </div>
//               <ul className='matchup championship'>
//                 <li className='team team-top'>
//                   &nbsp;<span className='vote-count'>&nbsp;</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//
