import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BASE, HOME, EDITOR, TEXTAREA } from './constants';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { WithTextareaComponent } from './pages/with-textarea/with-textarea.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([HOME]);
const redirectLoggedIn = () => redirectLoggedInTo([EDITOR]);

const routes: Routes = [
  {
    path: BASE,
    redirectTo: `/${HOME}`,
    pathMatch: 'full',
  },
  {
    path: HOME,
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedIn},
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