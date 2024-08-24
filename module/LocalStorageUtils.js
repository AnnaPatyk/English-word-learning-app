import ManagerWords from "./ManagerWords.js";
import { states } from "./utilities.js";

export default function restoreGameStateFromLocalStorage(state) {
  let wordsSession = JSON.parse(localStorage.getItem("wordsSession"));
  let managerWords = new ManagerWords(wordsSession, states);
  managerWords.currentIndex = JSON.parse(localStorage.getItem("currentIndex"));
  managerWords.correct = JSON.parse(localStorage.getItem("correct"));
  managerWords.noCorrect = JSON.parse(localStorage.getItem("noCorrect"));
  if (state === 2) {
    managerWords.showWord();
    managerWords.nextLoadWord();
  }
  if (state === 3) {
    managerWords.sessionNext();
    managerWords.nextLoadWord();
  }
  if (state === 4) {
    managerWords.showResult();
    managerWords.nextLoadWord();
  }
}
