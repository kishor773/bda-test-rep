import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllServiceComponent } from './all-service/all-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
const routes: Routes = [
    {
        path: 'allServices',
        component: AllServiceComponent
    },
    {
        path: 'singleServices/:id',
        component: SingleServiceComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceRoutingModule { }
