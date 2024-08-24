class Logger {
  static log(message) {}
}

class ConsoleLogger extends Logger {
  static log(massage) {
    console.log(massage);
  }
}

class AlertLogger extends Logger {
  static log(massage) {
    alert(massage);
  }
}
class DomLogger extends Logger {
  static log(massage) {
    const divError = document.createElement("div");
    divError.textContent = massage;
    divError.classList.add("error");
    document.body.appendChild(divError);
    setTimeout(() => divError.remove(), 5000);
  }
}
export { DomLogger, AlertLogger, ConsoleLogger };
