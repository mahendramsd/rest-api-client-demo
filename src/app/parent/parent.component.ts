import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Parent } from '../model/parent';
import { HttpClientService } from '../service/httpclient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


  parents: Parent[];

  defaultCode = 'N/A';
  page = 0;
  limit = 2;
  disableBackKey = false;
  disableNextKey = false;
  disableKey1 = false;
  disableKey2 = false;
  disableKey3 = false;
  isSpinner = false;


  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadParentsData(this.page, this.limit);
  }


  loadParentsData(page: number, limit: number) {
    this.isSpinner = true;
    this.httpClientService.getParents(page, limit).then(data => {
      this.parents = data;
      if (data.length === 0) {
        this.disableNextKey = true;
      }
      setTimeout(() => {
        this.isSpinner = false;
      }, 300);
    });
  }

  pagination(page: number) {
    this.disableKey1 = false;
    this.disableKey2 = false;
    this.disableKey3 = false;
    if (page === -1) {
      this.page -= 1;
    } else if (page === +1) {
      this.page += 1;
    } else if (page === 0) {
      this.page = page;
      this.disableKey1 = true;
    } else if (page === 1) {
      this.page = page;
      this.disableKey2 = true;
    } else if (page === 2) {
      this.page = page;
      this.disableKey3 = true;
    }

    if (this.page < 0) {
      this.page = 0;
      this.disableBackKey = true;
    } else {
      this.disableBackKey = false;
    }
    this.loadParentsData(this.page, this.limit);
  }

  loadChildData(parentId: number) {

  }



}



