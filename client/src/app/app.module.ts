import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { AllCategoryComponent } from './category/all-category/all-category.component';
import { FilterPipe } from './filter.pipe';
import { SharedModule } from './shared/shared.module';
import { AllServiceComponent } from './service/all-service/all-service.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SingleServiceComponent } from './service/single-service/single-service.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AllCategoryComponent,
    FilterPipe,
    AllServiceComponent, SingleServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
