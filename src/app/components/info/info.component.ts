import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  name: string = '';
  address: string = '';
  creditCard: number = 0;

  @Output() confirmation: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.confirmation.emit(this.name);
  }

}
