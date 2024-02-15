import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SearchLocComponent } from './search-loc/search-loc.component';
import { FiltersComponent } from './filters/filters.component';
import { AdvertismentComponent } from './advertisment/advertisment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    FooterComponent,
    SearchLocComponent,
    FiltersComponent,
    AdvertismentComponent,
    HeaderComponent

  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,


  ],
  exports: [
    FooterComponent,
    SearchLocComponent,
    FiltersComponent,
    AdvertismentComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
