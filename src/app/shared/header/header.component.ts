import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, SlicePipe],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  public usuario: Usuario | undefined;

  constructor(private usuarioSvc: UsuarioService) {
    this.usuario = usuarioSvc.usuario;
    // if (usuarioSvc.usuario) {
    //   this.imgUrl = usuarioSvc.usuario.imagenUrl;
    // }
  }

  logout() {
    this.usuarioSvc.logout();
  }
}
