import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, NgFor, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  menuItems: any[] = [];

  constructor(private sidebarSvc: SidebarService) {
    this.menuItems = sidebarSvc.menu;
  }

}
