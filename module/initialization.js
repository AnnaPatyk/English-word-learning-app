import { DomLogger } from "./loger.js";

import { key } from "./utilities.js";
export default class Initialization {
  static init(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => localStorage.setItem(key, JSON.stringify(data)))
      .catch((error) => {
        DomLogger.log(error.message);
      });
  }
}
