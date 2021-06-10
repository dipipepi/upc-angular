/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

'use strict';

// @ts-ignore
class Logger {
  private className: string;
  constructor(className) {
    this.className = className;
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

  public editArgument(argument): void {
    return argument ? ('[' + this.className + '] ' + argument) : argument;
  }
}

