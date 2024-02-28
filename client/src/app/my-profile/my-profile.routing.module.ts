import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourProfComponent } from './your-prof/your-prof.component';
import { SelectedCategories } from './selected-categories/selected-categories.component';
const routes: Routes = [
    {
        path: 'my-profile',
        component: YourProfComponent,
    },
    {
        path: 'categories',
        component: SelectedCategories,
    }, 
    {
        path: 'categories/:id',
        component: SelectedCategories,
    },

    // {
    //     path: 'categories',
    //     component: ListedServicesComponent,
    // },
    // {
    //     path: 'categories/:id',
    //     component: ListedServicesComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyProfileRoutingModule { }
