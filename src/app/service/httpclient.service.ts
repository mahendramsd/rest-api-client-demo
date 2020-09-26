import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ErrorMessageUtil } from '../utils/error-message';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  constructor(
    private httpClient: HttpClient,
    private errorMessageUtil: ErrorMessageUtil
  ) {

  }


  /**
   * upload parent.json file
   * @param fileToUpload
   */
  postParentFile(fileToUpload: File): Observable<boolean> {
    const endpoint = environment.endPoinUrl.concat('/parent/upload');
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData).pipe(map((response: Response) => {
        try {
          return true;
        } catch (error) {
          this.errorHandler(error);
          return false;
        }
      }));
  }

  /**
   * upload child.json file
   * @param fileToUpload
   */
  postChildFile(fileToUpload: File): Observable<boolean> {
    const endpoint = environment.endPoinUrl.concat('/child/upload');
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData).pipe(map((response: Response) => {
        try {
          return true;
        } catch (error) {
          this.errorHandler(error);
          return false;
        }
      }));
  }

  /**
   * Get Parent data with pagination
   * @param page
   * @param limit
   */
  public async getParents(page: number, limit: number): Promise<any> {
    return await this.httpClient
      .get(
        environment.endPoinUrl.concat('/parent') + '?page=' + page + '&limit=' + limit).toPromise();
  }

  /**
   * Error Handler
   * @param error
   */
  private errorHandler(error: Response) {
    this.errorMessageUtil.showErrorMessage(error.status);
    return Observable.throw(error || 'Server Error');

  }

  /**
   * Get Parent by Id
   * @param parentId
   */
  public async getParent(parentId: number): Promise<any> {
      return this.httpClient.get(environment.endPoinUrl.concat('/parent/get') + '?parentId=' + parentId).toPromise();
  }

}
