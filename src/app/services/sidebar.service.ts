import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '/' },
        { titulo: 'Barra de Progreso', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ],
    },
  ];

  constructor() {}
}
