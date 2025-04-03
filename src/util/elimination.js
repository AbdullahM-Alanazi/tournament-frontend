/**
 *
 * @param {*} data
 * data: 
 * let data = {
    dates: { startDate: "5/14/2023", endDate: "5/16/2023" },
    game: "a",
    name: "Phase1",
    teams: [
      ["Team 1", "Team 2"],
      ["Team 3", "Team 4"],
      ["Team 5", "Team 6"],
      ["Taem 7", "Taem 8"],
    ],
    results: [
      [
        [1, 2],
        [0, 1],
        [0, 6],
        [1, 0],
      ],
      [
        [1, 0],
        [1, 0],
      ],
      [[1, 0]],
    ],
    type: "Single Elimination",
  };

 * @returns 
 * [
    {
      name: 'Round 1',
      date: Date,
      matches: [{ teams: [ 'Team 4', 'Team 8' ], result: [ 9, 10 ] } , [Object], [Object], [Object] ]
    },
    { name: 'Round 2', matches: [ [Object], [Object] ] },
    { name: 'Round 3', matches: [ [Object] ] },
    {
      name: "Champion",
      team: ChampionName,
    }
  ]
  // * matches:  [{ teams: [ 'Team 4', 'Team 8' ], result: [ 9, 10 ] } ]
 */

function getRounds(data) {
  let rounds = [];
  if (data === undefined) {
    return [];
  }
  let teams = data.teams;
  let dividesDates = divideDateRange(data.dates, data.results.length);
  for (let i = 0; i < data.results.length; i++) {
    let round = { name: `Round ${i + 1}`, matches: [], date: dividesDates[i] };
    let nextRoundTeams = [];
    for (let j = 0; j < data.results[i].length; j++) {
      let match = {
        teams: teams[j],
        result: data.results[i][j],
      };
      round.matches.push(match);
      //
      if (data.results[i][j][0] === data.results[i][j][1]) {
        nextRoundTeams.push(null);
      } else {
        let winningTeamIndex = data.results[i][j].indexOf(
          Math.max(...data.results[i][j])
        );
        nextRoundTeams.push(teams[j][winningTeamIndex]);
      }
      //
    }
    rounds.push(round);
    teams = chunkArray(nextRoundTeams, 2);
  }
  let lastRound = rounds.at(-1).matches[0];
  if (lastRound.result[0] === lastRound.result[1]) {
    let ChampionName = null;
    rounds[rounds.length] = {
      name: "Champion",
      team: ChampionName,
    };
  } else {
    var indexOfMaxValue = lastRound.result.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    let ChampionName = lastRound.teams[indexOfMaxValue];
    rounds[rounds.length] = {
      name: "Champion",
      team: ChampionName,
    };
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
function divideDateRange(dateRange, n) {
  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);
  const interval = (endDate - startDate) / (n - 1);
  const dates = [];
  for (let i = 0; i < n; i++) {
    dates.push(new Date(new Date(startDate).getTime() + interval * i));
  }
  return dates;
}

export default getRounds;
