import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, RouterOutlet],
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent {

}
