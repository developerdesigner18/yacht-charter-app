import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as Notiflix from 'notiflix';
import { CryptoService } from '../../services/crypto.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private cryptoService: CryptoService,
  ) { }

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit()');
    this.loginForm = this.formbuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.loginForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { value } = this.loginForm;

    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    this.loginService.adminLogin(value).subscribe(
      res => {
        if (res.success) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(res.message);
          
          localStorage.setItem('u_info', this.cryptoService.encrypt(JSON.stringify(res.data)));
          localStorage.setItem('auth_token', res.token);
          
          this.router.navigateByUrl('/admin/admin-dashboard')
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(res.error);
          // this.broadcastService.sendToastMessage({
          //   msgTitle: 'Error',
          //   msgType: 'error',
          //   msgTxt: res.message
          // });
          
        }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error);
        // this.broadcastService.handleError(err.error.message);
      }
    );
  }

}
