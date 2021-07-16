import { Injectable } from '@angular/core';
import {from, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private listeners: any;
  private eventsSubject: Subject<any>;
  private events: any;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();

    this.events = from(this.eventsSubject);

    this.events.subscribe(({name, args}: any) => {
      if (this.listeners[name]) {
        for (const listener of this.listeners[name]) {
          listener(...args);
        }
      }
    });
  }

  /**
   * Listens an event and broadcasts it to the listeners.
   */
  on(name: string, listener: any): void {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  /**
   * Emits an event to all the listeners.
   */
  broadcast(name: string, ...args: Array<any>): void {
    this.eventsSubject.next({
      name,
      args
    });
  }

  /**
   * Destroys the listener from the listener list.
   */
  destroyListener(name: string, listener: any): void {
    if (this.listeners[name] && this.listeners[name].indexOf(listener) > -1) {
      this.listeners[name].splice(this.listeners[name].indexOf(listener), 1);
    }
  }
}
