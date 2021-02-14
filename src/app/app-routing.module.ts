import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDataComponent } from './product-data/product-data.component';
import { RegisterWelcomeComponent } from './register-welcome/register-welcome.component';
import { RegisterComponent } from './register/register.component';
import { SummaryComponent } from './summary/summary.component';
import { UserdataFormComponent } from './userdata-form/userdata-form.component';
import { FormValidatorAuthGuard } from './formvalidator-auth.guard';
import { VehicledataFormComponent } from './vehicledata-form/vehicledata-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, children: [
    {path: '', component: RegisterWelcomeComponent},
    {path: 'user-data', component: UserdataFormComponent},
    {path: 'vehicle-data', canActivate: [FormValidatorAuthGuard], data: {target: 'vehicle'},component: VehicledataFormComponent},
    {path: 'product-data', canActivate: [FormValidatorAuthGuard], data: {target: 'product'},component: ProductDataComponent},
    {path: 'summary', canActivate: [FormValidatorAuthGuard], data: {target: 'summary'},component: SummaryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
