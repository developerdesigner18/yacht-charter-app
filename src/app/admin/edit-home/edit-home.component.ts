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
  page_id: any;
  editHomeForm: FormGroup;
  url: any;
  format: any;

  constructor(
    private homeService: HomeService,
    public formbuilder: FormBuilder,
    private editHomeService: EditHomeService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('EditHomeComponent ngOnInit()');
    this.editHomeForm = this.formbuilder.group({
      tag_line: ["", Validators.required],
      heading_1: ["", Validators.required],
      description_1: ["", Validators.required],
      heading_2: ["", Validators.required],
      sub_heading_2: ["", Validators.required],
      description_2: ["", Validators.required],
      heading_3: ["", Validators.required],
      description_3: ["", Validators.required],
      landing_video: ["", Validators.required],
      image_1: ["", Validators.required],
    });

    this.homeService.getHomeData().subscribe(
      res => {
        this.page_id = res.data._id
        this.homeData = res.data
        this.editHomeForm.patchValue(res.data.content)        
        console.log('###edit-home', this.homeData);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.editHomeForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  onUpload(event: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    console.log('video', event.target.files);
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
    console.log(this.editHomeForm.value);
    
    Notiflix.Loading.remove();
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

    this.editHomeService.updateHomeData(this.page_id, value).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.message);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
  }

}
