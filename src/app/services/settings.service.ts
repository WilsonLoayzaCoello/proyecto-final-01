import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme: any = document.querySelector('#theme');
  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((elem: any) => {
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
