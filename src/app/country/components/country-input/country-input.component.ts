import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
})

export class CountryInputComponent implements OnInit {

  ngOnInit(){
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe (value => {
      this.onDebounce.emit( value )
    })
  }

  @Input()  placeholder: string = '';
  @Output() onEnter    : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce : EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  term: string = '';

  search() {
    this.onEnter.emit( this.term );
  }

  pressedKey() {
    this.debouncer.next( this.term );
  }
}
