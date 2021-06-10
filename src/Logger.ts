export class Logger {
  constructor(className) {
    this.className = className;
  }

  private className: string;

  private editArgument (argument):string {
    return argument ? ('[' + this.className + '] ' + argument) : argument;
  }

  public log(...messages): void {
    messages[0] = this.editArgument(messages[0]);
    try {
      return window.console.log.apply(console, messages);
    } catch (ex) {
    }
  }

  public info(...messages): void {
    messages[0] = this.editArgument(messages[0]);
    try {
      return window.console.info.apply(console, messages);
    } catch (ex) {
    }
  }

  public warn(...messages): void {
    messages[0] = this.editArgument(messages[0]);
    try {
      return window.console.warn.apply(console, messages);
    } catch (ex) {
    }
  }

  public error(...messages): void {
    messages[0] = this.editArgument(messages[0]);
    try {
      return window.console.error.apply(console, messages);
    } catch (ex) {
    }
  }

  public debug(...messages): void {
    messages[0] = this.editArgument(messages[0]);
    try {
      return window.console.debug.apply(console, messages);
    } catch (ex) {
    }
  }



}
