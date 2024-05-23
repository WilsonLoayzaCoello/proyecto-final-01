import { Component, AfterViewInit, viewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: [`./login.component.css`],
})
export default class LoginComponent {
  @viewChild('googleBtn') googleBtn: ElementRef;
  public formSubmited = false;

  public loginForm = this.fb.nonNullable.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '742972783567-sktgukohtmsu6m2obmr4irbjbu484cq3.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }

  login() {
    const loginData = <LoginForm>this.loginForm.value;
    this.usuarioSvc.login(loginData).subscribe({
      next: (resp) => {
        // console.log('Login', resp);
        // if (this.loginForm.get('remember')?.value) {
        //   localStorage.setItem('email', loginData.email);
        // } else {
        //   localStorage.removeItem('email');
        // }
        /////////////////////////////////////////////
        if (this.loginForm.get('remember')?.value) {
          const emailValue = loginData.email;
          if (emailValue !== null && emailValue !== undefined) {
            localStorage.setItem('email', emailValue);
          }
          // localStorage.setItem(
          //   'email',
          //   this.loginForm.get('email')?.value ?? ''
          // );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
}
