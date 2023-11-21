import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const enum EventHandler {
  show = 'show',
  hidden = 'hidden'
}

export interface VisibilityHandler {
  [EventHandler.show]: () => void;
  [EventHandler.hidden]: () => void;
}

export type DocumentExt = Document & { [key: string]: any }

@Injectable({ providedIn: 'root' })
export class VisibilityService {
  public handlers: Map<string, VisibilityHandler> = new Map<string, VisibilityHandler>();
  public timer = 30000;

  private readonly hidden: string;
  private readonly visibilityChange: string;
  private interval: number;
  private timestamp: number;
  private isActive = true;

  get isHidden(): boolean {
    return this.document[this.hidden];
  }

  public init(name: string, show: () => void, hidden: () => void) {
    this.handlers.set(name, { show, hidden });
    console.log('Visibility init', name);
    document.addEventListener(this.visibilityChange, this.handlerVisibilityChange, false);
    if (!this.isHidden) {
      this.emitHandler(EventHandler.show, name);
      this.isActive = false;
    }
  }

  public destroy(name: string) {
    this.isActive = true;
    this.interval = -1;
    this.timestamp = -1;
    document.removeEventListener(this.visibilityChange, this.handlerVisibilityChange, false);
    if (!this.isHidden) {
      this.emitHandler(EventHandler.hidden, name);
    }
    if (typeof name === 'string' && this.handlers.has(name)) {
      this.handlers.delete(name);
      console.log('Visibility destroy', name);
    }
  }

  private handlerVisibilityChange = () => {
    if (this.isHidden) {
      this.interval = window.setTimeout(() => this.emitHandler(EventHandler.hidden), this.timer);
      this.timestamp = Date.now();
    } else {
      const now = Date.now();
      if (this.interval && (now - this.timestamp > this.timer) || this.isActive) {
        this.emitHandler(EventHandler.show);
        this.isActive = false;
      } else {
        window.clearInterval(this.interval);
        this.interval = -1;
      }
    }
  };

  private emitHandler = (handler: EventHandler, name?: string): void => {
    if (typeof name === 'string' && this.handlers.has(name)) {
      console.log('Emit handler', handler, name);
      const event = this.handlers.get(name);
      if (event) {
        event[handler]();
      }
    } else {
      this.handlers.forEach((handlers: VisibilityHandler, key: string) => {
        console.log('Emit handler', handler, key);
        handlers[handler]();
      });
    }
  };

  constructor(@Inject(DOCUMENT) private document: DocumentExt) {
    if (typeof document.hidden !== 'undefined') {
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilityChange'.toLowerCase();
    } else if (typeof document['msHidden'] !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msVisibilityChange'.toLowerCase();
    } else if (typeof document['webkitHidden'] !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitVisibilityChange'.toLowerCase();
    }
  }
}
