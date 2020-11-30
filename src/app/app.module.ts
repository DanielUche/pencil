import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule  } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFirebaseModule } from './modules/app-firebase.module';
import { AppMaterialModule } from './modules/app-material.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { HeaderComponent } from './components/header/header.component';
import { EditorComponent } from './editor/editor.component';
import { MathjaxComponent } from './components/mathjax/mathjax.component';
import { WithTextareaComponent } from './with-textarea/with-textarea.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileCardComponent,
    HeaderComponent,
    EditorComponent,
    MathjaxComponent,
    WithTextareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppFirebaseModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
