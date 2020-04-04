import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<any> = new EventEmitter();

  state: Subject<string> = new Subject();
  cancel: Observable<string>;
  constructor() { 
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        console.log('%c stopped hold', 'color: #ec6969; font-weight: bold')
        this.holdTime.emit('I WANNA BE THE VERY BEST, LIKE NO ONE EVER WAS DUN DUN');
      })
    )
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event']) 
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c started hold', 'color: #5fba7d; font-weight bold')
    this.state.next('string');
    const n = 100;

    interval(n)
    .pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n);
      })
    )
    .subscribe()
  }

}