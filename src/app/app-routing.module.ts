import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

const routes: Routes = [
  {path:'', component:BlankLayoutComponent,canActivate:[authGuard], children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: HomeComponent, title:"Home"}
  ]},
  {path:'', component:AuthLayoutComponent, children:[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component: LoginComponent, title:"Login"},
    {path:'register', component: RegisterComponent, title:"Register"}
  ]},
  {path:"**", component:NotfoundComponent, title:"NotFound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
