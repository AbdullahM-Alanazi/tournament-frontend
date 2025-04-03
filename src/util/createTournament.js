/***
  * @param {*} data
 * {
    name: string,
    isSingleElimination: boolean,
    isRoundRobin: boolean,
    participants: array || number,
    game: string,
    dates: {
      startDate: new Date(),
      endDate: new Date()
    }
  }
  
  * @returns
  return 
  {
    name: string,
    type: string,
    game: string,
    teams: array,
  results: array,
  datas: Object
}
*/
function createEliminationTournament({
  name,
  isSingleElimination,
  isRoundRobin,
  participants,
  game,
  dates,
}) {
  let id = Date.now();
  let type = isRoundRobin
    ? "Round Robin"
    : isSingleElimination
    ? "Single Elimination"
    : "Unknown";
  let teams = isNumeric(participants)
    ? groupArrayElements(new Array(parseInt(participants)).fill(null))
    : groupArrayElements(participants);
  let results = isNumeric(participants)
    ? create3DArray(parseInt(participants))
    : create3DArray(participants.length);
  return {
    id,
    name,
    type,
    game,
    teams,
    results,
    dates,
  };
}

const isNumeric = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num);

function groupArrayElements(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push([arr[i], arr[i + 1]]);
  }
  return result;
}

function createTornament(tournament) {
  return tournament.isSingleElimination
    ? createEliminationTournament(tournament)
    : null;
}
const create3DArray = (n) => {
  let result = [];
  for (let i = n; i >= 2; i /= 2) {
    let innerArray = [];
    for (let j = 0; j < i / 2; j++) {
      innerArray.push([-1, -1]);
    }
    result.push(innerArray);
  }
  return result;
};
export default createTornament;
