import { Component } from '@angular/core';
import { UsuariosListaComponent } from './usuarios-lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuariosListaComponent],
  template: `<app-usuarios-lista></app-usuarios-lista>`,
})
export class AppComponent { }
