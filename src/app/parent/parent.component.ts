import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Parent } from '../model/parent';
import { HttpClientService } from '../service/httpclient.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from '../child/child.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


  // use for populate parents data grid
  parents: Parent[];
  // Page No for pagination
  page = 0;
  // Page limit for paginationb
  limit = 2;
  // status for back key
  disableBackKey = false;
  // status for next key
  disableNextKey = false;
   // status for key 1
  disableKey1 = false;
  // status for key 2
  disableKey2 = false;
  // status for key 3
  disableKey3 = false;
  // status for key spinner
  isSpinner = false;

  constructor(
    private httpClientService: HttpClientService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loadParentsData(this.page, this.limit);
  }

  /**
   * load parent data with pagination
   * @param page
   * @param limit
   */
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

  /**
   * Do Pagination
   * @param page
   */
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

  /**
   * Get Child data by parent ID
   * @param parentId
   */
  loadChildData(parentId: number) {
    this.httpClientService.getParent(parentId).then(data => {
      if (data.length > 0) {
        const modalRef = this.modalService.open(ChildComponent);
        modalRef.componentInstance.childs = data;
      } else {
        this.toastr.warning('No any child record found for this parent record');
      }

    });

  }
}



