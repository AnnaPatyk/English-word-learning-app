import { DomLogger, ConsoleLogger } from "./loger.js";
import { stateDefault } from "./utilities.js";
export default class ManagerWords {
  constructor(arr, state) {
    this.state = state;
    this.currentIndex = 0;
    this.wordsSession = arr;
    this.correct = [];
    this.noCorrect = [];
  }

  nextLoadWord() {
    document.querySelector("body").addEventListener("click", (e) => {
      try {
        if (e.target.classList.contains("btnBlok1")) {
          this.renewalLocalStorage(this.state.learning);
          this.showWord();
        }
        if (e.target.classList.contains("sessionRepeat")) {
          this.currentIndex = 0;
          this.shuffleArray(this.wordsSession);
          this.renewalLocalStorage(this.state.learning);
          this.showWord();
        }
        if (e.target.classList.contains("sessionNext")) {
          this.currentIndex = 0;
          this.renewalLocalStorage(this.state.answering);
          this.shuffleArray(this.wordsSession);
          this.sessionNext();
        }
        if (e.target.classList.contains("btnBlok2")) {
          this.checkTranslations();
          this.renewalLocalStorage(this.state.answering);
          this.sessionNext();
        }
        if (e.target.classList.contains("sessionEnd")) {
          this.endSession();
          this.renewalLocalStorage(this.state[stateDefault]);
        }
      } catch (e) {
        DomLogger.log(e.message);
        ConsoleLogger.log(e.message);
      }
    });
  }
  renewalLocalStorage(state) {
    localStorage.setItem("storedState", state);
    localStorage.setItem("currentIndex", this.currentIndex);
    localStorage.setItem("correct", JSON.stringify(this.correct));
    localStorage.setItem("noCorrect", JSON.stringify(this.noCorrect));
    localStorage.setItem("wordsSession", JSON.stringify(this.wordsSession));
  }
  showWord() {
    if (this.currentIndex < this.wordsSession.length) {
      this.removeBlok();
      const word = this.wordsSession[this.currentIndex];
      document.querySelector("body").insertAdjacentHTML(
        "beforeend",
        `
      <div class ="blok2">
      <h3>Сесія : ${this.currentIndex + 1}  з ${
          this.wordsSession.length
        } слів </h3>
      <p> ${word.en}</p>   
      <p> ${word.transcription}</p>   
      <p> ${word.ua}</p>
      <button class = "btnBlok1"> Наступне слово</button>
      </div>
      `
      );
      this.currentIndex++;
    } else {
      this.sessionSelection();
    }
  }

  sessionSelection() {
    this.removeBlok();
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
      <div class ="blok2">
      <h3>Ви переглянули всі слова</h3>
      <button class = "sessionNext"> Вивчати далі</button>
      <button class = "sessionRepeat"> Повторити слова</button>
      </div>
      `
    );
  }

  sessionNext() {
    if (this.currentIndex < this.wordsSession.length) {
      this.removeBlok();

      const word = this.wordsSession[this.currentIndex];
      document.querySelector("body").insertAdjacentHTML(
        "beforeend",
        `
      <div class ="blok2">
      <h3>Сесія : ${this.currentIndex + 1}  з ${
          this.wordsSession.length
        } слів </h3>
      <p> ${word.en}</p>   
      <input type="text" name="wordTranslation" id="wordTranslation" placeholder="ваша відповідь" data-translations="${
        word.ua
      }">
      <button class = "btnBlok2"> Наступне слово</button>
      </div>
      `
      );
      this.currentIndex++;
    } else {
      this.showResult();
    }
  }

  removeBlok() {
    document.querySelectorAll(".blok2").forEach((block) => block.remove());
  }

  checkTranslations() {
    let originalWord =
      this.wordsSession[this.currentIndex - 1].en.toLowerCase();
    let input = document.querySelector("#wordTranslation");
    let value = input.value.trim().toLowerCase();
    let translation = this.wordsSession[this.currentIndex - 1].ua.toLowerCase();
    if (value.length !== 0) {
      if (value === translation) {
        this.correct.push({ ua: value, en: originalWord });
      } else {
        this.noCorrect.push({ ua: value, en: originalWord });
      }
    } else {
      throw new Error("Поле введення не може бути пустим!");
    }
  }

  showResult() {
    this.removeBlok();

    let correctStr = "";
    let noCorrectStr = "";
    if (this.correct.length > 0) {
      correctStr = "<p>Правильні переклади:</p><ul>";
      this.correct.forEach((word) => {
        correctStr += `<li>${word.ua} - ${word.en}</li>`;
      });
      correctStr += "</ul>";
    }

    if (this.noCorrect.length > 0) {
      noCorrectStr = "<p>Неправильні переклади:</p><ul>";
      this.noCorrect.forEach((word) => {
        noCorrectStr += `<li>${word.ua} - ${word.en}</li>`;
      });
      noCorrectStr += "</ul>";
    }

    let buttonsHtml = "";
    if (this.noCorrect.length > 0) {
      buttonsHtml = '<button class="sessionRepeat">Спробувати ще раз</button>';
    } else {
      buttonsHtml = '<button class="sessionEnd">Завершити вивчення</button>';
    }

    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
        <div class ="blok2">
            <h3>Результат: <span> ${this.correct.length}</span> з  ${this.wordsSession.length}</h3>
            ${correctStr}
            ${noCorrectStr}
            ${buttonsHtml}
        </div>
        `
    );
    this.renewalLocalStorage(this.state.results);
    this.correct.length = 0;
    this.noCorrect.length = 0;
  }

  endSession() {
    this.removeBlok();
    let words = JSON.parse(localStorage.getItem("words"));
    if (words.length === 0) {
      this.renewalLocalStorage(this.state[stateDefault]);
      localStorage.removeItem("words");
      throw new Error("Ви вивчили всі слова. Вітаю");
    }
    words = words.filter(
      (word) =>
        !this.wordsSession.some((sessionWord) => sessionWord.en === word.en)
    );
    this.wordsSession = [];

    localStorage.setItem("words", JSON.stringify(words));
    const div = document.querySelector(".blok1");
    div.classList.remove("display");
  }
  shuffleArray(arr) {
    return arr.sort(() => {
      return 0.3 - Math.random();
    });
  }
}
