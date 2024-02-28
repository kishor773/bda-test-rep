import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCategoryComponent } from './category/all-category/all-category.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AllServiceComponent } from './service/all-service/all-service.component';
import { FiltersComponent } from './shared/filters/filters.component';
import { YourProfComponent } from './my-profile/your-prof/your-prof.component';
import { SingleServiceComponent } from './service/single-service/single-service.component';
import { UserSearchComponent } from './user-search/user-search.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    // data: { breadcrumb: 'Home' }
  },
  {
    path: 'allCategory',
    component: AllCategoryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'filters',
    component: FiltersComponent
  },
  {
    path: 'user-search',
    component: UserSearchComponent
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./my-profile/my-profile.module').then((m) => m.MyProfileModule),
  }, {
    path: 'services',
    loadChildren: () =>
      import('./service/service.module').then((m) => m.ServiceModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
