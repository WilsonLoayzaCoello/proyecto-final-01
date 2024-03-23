import { Component, OnInit } from '@angular/core';
import LocalStorageService from '../../services/local-storage.service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './account-settings.component.html',
  styles: ``,
})
export default class AccountSettingsComponent implements OnInit {
  public linkTheme: any = this.document.querySelector('#theme');
  // public links!: NodeListOf<Element>;
  public links: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,

  ) {}

  ngOnInit(): void {
    if (Array.isArray(this.links)) {
      this.links.forEach(link => {
        this.links = Array.from(this.document.querySelectorAll('.selector'));
        this.checkCurrentTheme();
      });
    }
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    this.localStorageService.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach((elem: any) => {
      elem.classList.remove('working');
      const btn = elem.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btn}.css`;
      const currentUrl = this.linkTheme!.getAttribute('href');
      if (btnUrl === currentUrl) {
        elem.classList.add('working');
      }
    });
  }
}
