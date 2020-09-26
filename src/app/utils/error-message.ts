import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageUtil {

    constructor(private toastr: ToastrService) { };


    public showErrorMessage(status: number) {
        switch (status) {
            case 400: {
                this.toastr.error("Application error. Please contact system administrator");
                break;
            }
            case 404: {
                this.toastr.error("Service not found. Please contact your system administrator");
                break;
            }
            case 408: {
                this.toastr.error("Server request Timeout. Please try again later");
                break;
            }
        }
    }
}