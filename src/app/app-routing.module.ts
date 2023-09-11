import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SetBudgetComponent } from './components/set-budget/set-budget.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'transaction',component:TransactionComponent},
  {path:'set-budget',component:SetBudgetComponent},
  
  
  // {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
