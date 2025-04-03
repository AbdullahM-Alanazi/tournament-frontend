function isPowerOfTwo(x) {
  return (Math.log(x) / Math.log(2)) % 1 === 0;
}
function isEmpty(value) {
  let flag =
    // null or undefined
    value == null ||
    // has length and it's zero
    (value.hasOwnProperty("length") && value.length === 0) ||
    value <= 0 ||
    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0);
  return flag;
}
function isValidNumberOfTeams(n) {
  if (n.constructor === Array) {
    return isPowerOfTwo(n.length) && n.length !== 1;
  } else {
    return isPowerOfTwo(n) && n != 1;
  }
}
// * Validate a form
const isValidForm = (form) => {
  let { name, game, participants, dates } = form;
  if (participants.constructor === Array && participants.length === 1) {
    return false;
  }
  return !(
    isEmpty(name) ||
    isEmpty(game) ||
    isEmpty(dates) ||
    isEmpty(participants) ||
    !isValidNumberOfTeams(participants)
  );
};
export default isValidForm;
export { isEmpty };
