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
  image_1_url: any;
  landing_video_url: any;
  format: any;
  video_file: any;
  image_file: any;

  constructor(
    private homeService: HomeService,
    public formbuilder: FormBuilder,
    private editHomeService: EditHomeService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('EditHomeComponent ngOnInit()');
    this.remove_photo(); this.remove_video();
    this.editHomeForm = this.formbuilder.group({
      tag_line: ["", Validators.required],
      heading_1: ["", Validators.required],
      description_1: ["", Validators.required],
      heading_2: ["", Validators.required],
      sub_heading_2: ["", Validators.required],
      description_2: ["", Validators.required],
      heading_3: ["", Validators.required],
      description_3: ["", Validators.required],
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
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        // this.format = 'image';
        this.image_file = file
        reader.onload = (event) => {
          this.image_1_url = (<FileReader>event.target).result;
        }
      } else if(file.type.indexOf('video')> -1){
        // this.format = 'video';
        this.video_file = file
        reader.onload = (event) => {
          this.landing_video_url = (<FileReader>event.target).result;
        }
      }
    }
    Notiflix.Loading.remove();
  }

  remove_video() {
    this.landing_video_url = undefined
    this.video_file = undefined
  }

  remove_photo() {
    this.image_1_url = undefined
    this.image_file = undefined
  }

  submitData() {    
    if (this.editHomeForm.pristine && !this.video_file && !this.image_file) {
      return;
    }
    
    const { value } = this.editHomeForm;
    value.landing_video = this.video_file
    value.image_1 = this.image_file
        
    var fd = new FormData();
    fd.append('tag_line', value.tag_line);
    fd.append('heading_1', value.heading_1);
    fd.append('description_1', value.description_1);
    fd.append('heading_2', value.heading_2);
    fd.append('sub_heading_2', value.sub_heading_2);
    fd.append('description_2', value.description_2);
    fd.append('heading_3', value.heading_3);
    fd.append('description_3', value.description_3);
    fd.append('landing_video', value.landing_video);
    fd.append('image_1', value.image_1);

    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )

    this.editHomeService.updateHomeData(this.page_id, fd).subscribe(
      res => {
        Notiflix.Loading.remove();        
        Notiflix.Notify.success(res.body?.message);
        this.ngOnInit()
        if (!res.body?.success) { Notiflix.Notify.failure(res.body?.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
  }
}
