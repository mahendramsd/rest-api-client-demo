
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css']
})
export class FetchComponent implements OnInit {

  // File Parent
  fileToParent: File = null;
  // File Child
  fileToChild: File = null;
  // Status for parent data uploaded
  isParentData = true;
  // Status for child data uploaded
  isChildData = true;


  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  /**
   * Set Parent File
   * @param files
   */
  handleFileParent(files: FileList) {
    this.fileToParent = files.item(0);
    this.isParentData = false;
  }

  /**
   * Set Child File
   * @param files
   */
  handleFileChild(files: FileList) {
    this.fileToChild = files.item(0);
  }


  /**
   * Upload parent.json Data
   */
  uploadParentData() {
    this.httpClientService.postParentFile(this.fileToParent).subscribe(data => {
      this.toastr.success('Parent Data upload succesfully...');
      this.isChildData = false;
      this.isParentData = true;
    }, error => {
      this.toastr.error('Parent Data upload fail...');
    });
  }

  /**
   * Upload child.json Data
   */
  uploadChildData() {
    this.httpClientService.postChildFile(this.fileToChild).subscribe(data => {
      this.toastr.success('Child Data upload succesfully...');
      this.isChildData = true;
      this.isParentData = true;
      this.router.navigate(['parent']);
    }, error => {
      this.toastr.error('Child Data upload fail...');
    });
  }
}
