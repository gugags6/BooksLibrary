import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msh-error',
  templateUrl: './msh-error.component.html',
  styleUrls: ['./msh-error.component.css']
})
export class MshErrorComponent implements OnInit {

  @Input() mensagem : string;
  @Input() isError : boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
