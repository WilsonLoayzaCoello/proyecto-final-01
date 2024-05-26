declare const google: any;

import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: [`./login.component.css`],
})
export default class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;
  public formSubmited = false;

  public loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    @Inject(PLATFORM_ID) private platformId: object,
    private ngZone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('email')) {
      this.loginForm.patchValue({
        email: localStorage.getItem('email') || '',
      });
    }
  }

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.googleInit();
  //   }
  // }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript()
        .then(() => {
          this.googleInit();
        })
        .catch((err) => {
          console.error('Error loading Google script:', err);
        });
    }
  }

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-jssdk');
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-jssdk';
      script.onload = () => {
        resolve();
      };
      script.onerror = (err) => {
        reject(err);
      };

      document.body.appendChild(script);
    });
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '742972783567-sktgukohtmsu6m2obmr4irbjbu484cq3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log('Encoded JWT ID token: ' + response.credential);

    this.usuarioSvc.loginGoogle(response.credential).subscribe({
      next: (resp) => {
        // console.log({ login: resp });
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      error: (err) => {
        console.log(err.error.msg);
      },
    });
  }

  login() {
    const loginData = <LoginForm>this.loginForm.value;
    this.usuarioSvc.login(loginData).subscribe({
      next: (resp) => {
        if (isPlatformBrowser(this.platformId)) {
          if (this.loginForm.get('remember')?.value) {
            const emailValue = loginData.email;
            if (emailValue !== null && emailValue !== undefined) {
              localStorage.setItem('email', emailValue);
            }
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
}
