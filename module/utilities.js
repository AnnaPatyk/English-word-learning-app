let url = "words.json";
let key = "words";
let stateDefault = "start";
const states = {
  [stateDefault]: 1,
  learning: 2,
  answering: 3,
  results: 4,
};

function hideBlock() {
  const div = document.querySelector(".blok1");
  div.classList.add("display");
}

export { url, key, stateDefault, states, hideBlock };
