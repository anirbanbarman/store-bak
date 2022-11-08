import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  constructor() { }

  private currentIndex = 0;
  private currentLoaderIds: number[] = [];

  public emitter = new BehaviorSubject<boolean>(true);

  start(): number {
    debugger
    this.currentIndex++;
    this.currentLoaderIds.push(this.currentIndex);
    this.emitter.next(true);
    return this.currentIndex;
  }

  end(id?: number): void {
    if (!id) {
      return;
    }
    this.currentLoaderIds = this.currentLoaderIds.filter(i => i !== id);
    if (this.currentLoaderIds.length === 0) {
      this.emitter.next(false);
    }
  }
}
