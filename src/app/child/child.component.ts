import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  // Get Child data from parent component
  @Input() childs;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
