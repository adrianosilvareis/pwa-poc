import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () => import("@pages/clients/clients.module").then(m => m.ClientsModule)
  },
  {
    path: 'services',
    canActivate: [AuthGuard],
    loadChildren: () => import("@pages/company-services/company-services.module").then(m => m.CompanyServicesModule)
  },
  {
    path: 'contracts',
    canActivate: [AuthGuard],
    loadChildren: () => import("@pages/contracts/contracts.module").then(m => m.ContractsModule)
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
