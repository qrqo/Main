import { Routes } from '@angular/router';
import { from } from 'rxjs';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { SettingProductComponent } from '../../pages/setting-product/setting-product.component';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent
    },
    { 
        path: 'setting-product',
        component: SettingProductComponent
    }
];
