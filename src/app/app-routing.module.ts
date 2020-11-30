import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BASE, HOME, EDITOR, TEXTAREA } from './constants';
import { HomeComponent } from './components/home/home.component'
import { EditorComponent } from './editor/editor.component';
import { WithTextareaComponent } from './with-textarea/with-textarea.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([HOME]);

const routes: Routes = [
  {
    path: BASE,
    redirectTo: `/${HOME}`,
    pathMatch: 'full',
  },
  {
    path: HOME,
    component: HomeComponent,
  },
  {
    path: EDITOR,
    component: EditorComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: TEXTAREA,
    component: WithTextareaComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }