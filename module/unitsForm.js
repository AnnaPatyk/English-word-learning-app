import { DomLogger, ConsoleLogger } from "./loger.js";
import WordArrayManager from "./WordArrayManager.js";
import ManagerWords from "./ManagerWords.js";
import { states, stateDefault, hideBlock } from "./utilities.js";

export default function handleFormSubmission(e) {
  e.preventDefault();
  localStorage.setItem("storedState", states[stateDefault]);
  let form = new FormData(form1);
  let size = form.get("number").trim();
  try {
    if (size !== "" && parseInt(size) > 0) {
      hideBlock();

      var wordWordArr = new WordArrayManager(size);
      let wordsSession = wordWordArr.returnArr("words");
      let managerWords = new ManagerWords(wordsSession, states);
      managerWords.renewalLocalStorage(states.learning);
      managerWords.showWord();
      managerWords.nextLoadWord();
    } else {
      throw new Error("Будь ласка, введіть додатнє число в поле!");
    }
  } catch (error) {
    DomLogger.log(error.message);
    ConsoleLogger.log(error.message);
  }
}
