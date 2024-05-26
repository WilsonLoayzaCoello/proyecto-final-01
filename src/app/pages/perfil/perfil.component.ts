import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import { CommonModule, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, CommonModule],
  templateUrl: './perfil.component.html',
  styles: ``,
})
export default class PerfilComponent implements OnInit {
  perfilForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
  });
  submitted = false;

  public usuario: Usuario;
  public imagenSubir: File | undefined;
  private fileUploadSvc = new FileUploadService();
  public imgTemp: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm?.value).subscribe({
      next: (resp) => {
        const { nombre, email } = this.perfilForm?.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;

        Swal.fire('Guardado', 'Cambios guardados correctamente', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
    this.submitted = true;
  }

  cambiarImagen(event: any) {
    const file: File = event.target.files[0];
    this.imagenSubir = file;
    if (!file) {
      return (this.imgTemp = '');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };
    return null;
  }

  subirImagen() {
    this.fileUploadSvc
      .actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario.uid || '')
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
