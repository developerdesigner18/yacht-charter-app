import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditBoatInfoService } from './edit-boat-info.service';
import { BoatInfoService } from '../../boat-info/boat-info.service'
import * as Notiflix from 'notiflix';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-boat-info',
  templateUrl: './edit-boat-info.component.html',
  styleUrls: ['./edit-boat-info.component.scss']
})
export class EditBoatInfoComponent implements OnInit {
  BASE_URI: string;
  boatInfoDataAll: any;
  boatInfoById: any;
  boat_id: any;
  editBoatInfoForm: FormGroup;
  url: any;
  format: any;
  image_1_url: any;
  landing_video_url: any;
  video_file: any;
  image_file: any;

  constructor(
    public formbuilder: FormBuilder,
    private editBoatInfoService: EditBoatInfoService,
    private boatInfoService: BoatInfoService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('EditBoatInfoComponent ngOnInit()');
    this.editBoatInfoForm = this.formbuilder.group({
      boat_type: ["", Validators.required],
      name: ["", Validators.required],
      width: ["", Validators.required],
      mfg_year: ["", Validators.required],
      manufacturer: ["", Validators.required],
      guest_capacity: ["", Validators.required],
      crew_capacity: ["", Validators.required],
      engine_type: ["", Validators.required],
      top_speed: ["", Validators.required],
      interior: ["", Validators.required],
      exterior: ["", Validators.required],
      price: ["", Validators.required],
    });

    this.getBoatInfoAll()
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.editBoatInfoForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  getBoatInfoAll() {
    this.editBoatInfoService.getBoatInfoAll().subscribe(
      res => {
        // this.boat_id = res.data._id
        this.boatInfoDataAll = res.data
        this.editBoatInfoForm.patchValue(res.data.content)        
        console.log('###edit-boat-info', this.boatInfoDataAll);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }

  insertBoatInfo() {

  }

  updateBoatInfo(boat_id: any) {
    this.boatInfoService.getBoatInfoById(boat_id).subscribe(
      res => {
        // this.boat_id = res.data._id
        this.boatInfoById = res.data
        // this.editBoatInfoForm.patchValue(res.data.content)      
        console.log('###boatInfoById', this.boatInfoById);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }

  changeBoatStatus(boat_id: any, status: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    status == 'active' ? status = 'inactive' : status = 'active';
    this.editBoatInfoService.changeBoatStatus(boat_id, status).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.body.message);        
        this.getBoatInfoAll()
        if (!res.body.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
  }

  deleteBoatInfo(boat_id: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    this.editBoatInfoService.deleteBoatInfo(boat_id).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.body.message);        
        this.getBoatInfoAll()
        if (!res.body.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
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
    if (this.editBoatInfoForm.pristine && !this.video_file && !this.image_file) {
      return;
    }

    const { value } = this.editBoatInfoForm;

    console.log(value);

    var fd = new FormData();
    fd.append('boat_type', value.boat_type);
    fd.append('name', value.name);
    fd.append('width', value.width);
    fd.append('mfg_year', value.mfg_year);
    fd.append('manufacturer', value.manufacturer);
    fd.append('guest_capacity', value.guest_capacity);
    fd.append('crew_capacity', value.crew_capacity);
    fd.append('engine_type', value.engine_type);
    fd.append('top_speed', value.top_speed);
    fd.append('interior', value.interior);
    fd.append('exterior', value.exterior);
    fd.append('price', value.price);
    fd.append('cover_image', value.cover_image);
    fd.append('images', value.images);

    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )

    this.editBoatInfoService.updateBoatInfo(this.boat_id, fd).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.body.message);
        if (!res.success) { Notiflix.Notify.failure(res.body.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
  }

}
