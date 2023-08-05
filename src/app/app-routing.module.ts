import { ErrorComponent } from './error/error.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OpenedItemComponent } from './opened-item/opened-item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'home/:id', component: OpenedItemComponent},
  {path: '**', component: ErrorComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
