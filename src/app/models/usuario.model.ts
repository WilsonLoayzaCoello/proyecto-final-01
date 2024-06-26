import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  get imagenUrl() {
    if (this.img && this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${baseUrl}/upload/usuarios/${this.img}`;
    } else {
      return `${baseUrl}/upload/usuarios/no-image`;
    }
  }
}
