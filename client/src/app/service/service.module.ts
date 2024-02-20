import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service.routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, ServiceRoutingModule, FormsModule, SharedModule
  ]
})
export class ServiceModule { }
