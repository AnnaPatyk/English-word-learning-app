export default class WordArrayManager {
  constructor(size) {
    this.size = size;
    this.words = [];
    this.wordsSession = [];
  }

  returnArr(key) {
    this.words = JSON.parse(localStorage.getItem(key));
    this.wordsSession = this.words.splice(0, this.size);
    return this.wordsSession.sort(() => {
      return 0.5 - Math.random();
    });
  }
}
