import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { NgFor } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, NgFor, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  public usuario: Usuario | undefined;
  public menuItems: any[] = [];

  constructor(
    private sidebarSvc: SidebarService,
    private usuarioSvc: UsuarioService
  ) {
    this.menuItems = sidebarSvc.menu;
    this.usuario = usuarioSvc.usuario;
    // if (usuarioSvc.usuario) {
    //   this.imgUrl = usuarioSvc.usuario.imagenUrl;
    // }
  }
}
