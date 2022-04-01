import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    private loginService: LoginService,
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

    Notiflix.Loading.circle({
      cssAnimationDuration: 2000,
      backgroundColor: '#ffffff',
    },
    )
    this.loginService.adminLogin(value).subscribe(
      res => {
        if (res.success) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Sol lucet omnibus');
          // localStorage.setItem('user_info', res.data.emp_name);
          // localStorage.setItem('isq_password', value.password);

        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure('Qui timide rogat docet negare');
          // this.broadcastService.sendToastMessage({
          //   msgTitle: 'Error',
          //   msgType: 'error',
          //   msgTxt: res.message
          // });
          
        }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure('Qui timide rogat docet negare');
        // this.broadcastService.handleError(err.error.message);
      }
    );
  }

}
