import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Solo ReactiveFormsModule
import { EmprendimientosComponent } from './emprendimientos/emprendimientos.component';
import { EmprendimientoDetalleComponent } from './emprendimiento-detalle/emprendimiento-detalle.component';
import { HttpClientModule } from '@angular/common/http'; // Para hacer peticiones Http a la API
import { CommentComponent } from './comment/comment.component';
import { PublicacionComponent } from './publicacion/publicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistroComponent,
    LoginComponent,
    EmprendimientosComponent,
    EmprendimientoDetalleComponent,
    CommentComponent,
    PublicacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Para hacer peticiones Http a la API
    ReactiveFormsModule, // Para usar FormBuilder
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
