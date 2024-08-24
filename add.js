import {
  url,
  key,
  stateDefault,
  states,
  hideBlock,
} from "./module/utilities.js";
import restoreGameStateFromLocalStorage from "./module/LocalStorageUtils.js";
import handleFormSubmission from "./module/unitsForm.js";
import Initialization from "./module/initialization.js";
function initializeLocalStorageIfNeeded(url, state) {
  debugger;
  if (localStorage.getItem("words") === null) {
    Initialization.init(url);
    localStorage.setItem("storedState", state);
  }
}

initializeLocalStorageIfNeeded(url, states[stateDefault]);
const storedStatus = localStorage.getItem("storedState");
let currentStatus = states.stateDefault;
if (storedStatus !== null) {
  currentStatus = parseInt(storedStatus);
}
switch (currentStatus) {
  case states.stateDefault:
    const form = document.querySelector("#form1");
    form.addEventListener("submit", handleFormSubmission);

    break;
  case states.learning: {
    hideBlock();
    restoreGameStateFromLocalStorage(states.learning);
    break;
  }
  case states.answering: {
    hideBlock();
    restoreGameStateFromLocalStorage(states.answering);
    break;
  }
  case states.results: {
    hideBlock();
    restoreGameStateFromLocalStorage(states.results);
    break;
  }
  default: {
    localStorage.setItem("storedState", states[stateDefault]);
    const form = document.querySelector("#form1");
    form.addEventListener("submit", handleFormSubmission);
  }
}
