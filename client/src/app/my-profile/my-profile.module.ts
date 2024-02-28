import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideProfComponent } from './side-prof/side-prof.component';
import { YourProfComponent } from './your-prof/your-prof.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectedCategories } from './selected-categories/selected-categories.component';
import { MyProfileRoutingModule } from './my-profile.routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { PlansComponent } from './plans/plans.component';


@NgModule({
  declarations: [
    SideProfComponent,
    YourProfComponent,
    SelectedCategories,
    PlansComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    MyProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class MyProfileModule { }
