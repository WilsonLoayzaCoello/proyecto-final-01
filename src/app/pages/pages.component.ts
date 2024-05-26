import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import LocalStorageService from '../services/local-storage.service';
import { CustomInitFunctionsService } from '../services/custom-init-functions.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  templateUrl: './pages.component.html',
  styles: ``,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    RouterOutlet,
  ],
})
export default class PagesComponent implements OnInit {
  public linkTheme: any = this.document.querySelector('#theme');
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    private customInitFunctions: CustomInitFunctionsService
  ) {}

  ngOnInit(): void {
    // customInitFunctions();
    this.customInitFunctions.customInitFunctions;
    const url =
      this.localStorageService.getItem('theme') ||
      './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }
  year: number = new Date().getFullYear();
}
