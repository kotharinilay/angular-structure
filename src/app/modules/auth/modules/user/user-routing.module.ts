import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent, AddUserComponent, EditProfileComponent } from './components';


const routes: Routes = [
    {
        path: '', component: null, redirectTo: 'list', pathMatch: 'full',
        children: [
            { path: 'list', component: UserListComponent },
            { path: 'add', component: AddUserComponent },
            { path: 'edit-profile', component: EditProfileComponent }
        ]
    }
];

export const UserRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

