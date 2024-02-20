import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllServiceComponent } from './all-service/all-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
const routes: Routes = [
    {
        path: 'allServices',
        component: AllServiceComponent, data: { breadcrumb: 'All Services' }

    },
    // {
    //     path: 'allServices/:location/:name',
    //     component: AllServiceComponent, data: { breadcrumb: 'All Services' }

    // },
    {
        path: 'allServices/:location/:name',
        component: AllServiceComponent, data: { breadcrumb: 'All Services' }

    },
    {
        path: 'singleServices/:id',
        component: SingleServiceComponent, data: { breadcrumb: 'Single Service' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceRoutingModule { }
