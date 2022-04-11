import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../home/home.service';
import { EditHomeService } from './edit-home.service';
import * as Notiflix from 'notiflix';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {
  BASE_URI: string;
  homeData: any;
  editHomeForm: FormGroup;

  constructor(
    private homeService: HomeService,
    public formbuilder: FormBuilder,
    private editHomeService: EditHomeService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit()');
    this.editHomeForm = this.formbuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.homeService.getHomeData().subscribe(
      res => {
        this.homeData = res.data
        console.log('###edit-home', this.homeData);
        
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error.message);
      }
    );
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.editHomeForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  submitData() {
    if (this.editHomeForm.invalid) {
      return;
    }

    const { value } = this.editHomeForm;

    console.log(value);
    
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )

    this.editHomeService.insertHomeData(this.homeData._id, value).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.message);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error.message);
      }
    )
  }

}
