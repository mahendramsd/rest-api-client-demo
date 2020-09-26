import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHtppInterceptorService } from './service/auth-htpp-interceptor.service';
import { AuthenticationService } from './service/authentication.service';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { TagInputModule } from 'ngx-chips';
import { ParentComponent } from './parent/parent.component';
import { FetchComponent } from './fetch/fetch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorMessageUtil } from './utils/error-message';
import { MaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    FetchComponent,
    ParentComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    MatNativeDateModule,
    HttpClientModule,
    TagInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule

  ],
  entryComponents: [
    ChildComponent,
  ],
  providers: [AuthenticationService, AuthGaurdService, ErrorMessageUtil,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
