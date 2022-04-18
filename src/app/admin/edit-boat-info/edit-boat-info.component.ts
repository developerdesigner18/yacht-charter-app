import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditBoatInfoService } from './edit-boat-info.service';
import { BoatInfoService } from '../../boat-info/boat-info.service'
import * as Notiflix from 'notiflix';
import { environment } from '../../../environments/environment';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-edit-boat-info',
  templateUrl: './edit-boat-info.component.html',
  styleUrls: ['./edit-boat-info.component.scss'],
  animations: [
    trigger('enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity:0})) 
      ])
    ])
  ],

})
export class EditBoatInfoComponent implements OnInit {
  BASE_URI: string;
  boatInfoDataAll: any;
  boatInfoById: any;
  boatInfoForm: FormGroup;
  show_form: boolean = false;
  url: any;
  format: any;
  cover_image_url: any;
  boat_images_url: any = [];
  cover_image: any;
  boat_images: any = [];

  constructor(
    public formbuilder: FormBuilder,
    private editBoatInfoService: EditBoatInfoService,
    private boatInfoService: BoatInfoService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('EditBoatInfoComponent ngOnInit()');
    this.boatInfoForm = this.formbuilder.group({
      _id: [null, Validators.required],
      boat_type: ["", Validators.required],
      boat_info: this.formbuilder.group({
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
      })
    });

    this.getBoatInfoAll()
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.boatInfoForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  getBoatInfoAll() {
    this.editBoatInfoService.getBoatInfoAll().subscribe(
      res => {
        // this.boat_id = res.data._id
        this.boatInfoDataAll = res.data
        this.boatInfoForm.patchValue(res.data.content)        
        console.log('###edit-boat-info', this.boatInfoDataAll);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }
  
  getBoatInfoById(boat_id: any) {
        this.boatInfoService.getBoatInfoById(boat_id).subscribe(
      res => {
        Notiflix.Loading.remove();
        this.boatInfoById = res.data
        console.log('this.boatInfoById', this.boatInfoById.boat_images);
        
        this.boatInfoForm.patchValue(res.data)
        console.log('###boatInfoById', this.boatInfoById);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }

  insertBoatInfo() {
    this.boatInfoForm.reset()
    this.boatInfoById = []
    this.removeCoverImage()
    this.remove_image_all()
    this.show_form = true;
    // this.boatInfoForm.patchValue(res.data.content)      
  }

  updateBoatInfo(boat_id: any) {
    this.show_form = true;
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    this.getBoatInfoById(boat_id)
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

  deleteBoatImage(boat_id: any, image_id: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    this.editBoatInfoService.deleteBoatImage(boat_id, image_id).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.body.message);        
        this.getBoatInfoById(boat_id)
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

  onCoverImageUpload(event: any) {
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
        this.cover_image = file
        reader.onload = (event) => {
          this.cover_image_url = (<FileReader>event.target).result;
        }
      }
    }
    Notiflix.Loading.remove();
  }

  onBoatImagesUpload(event: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){        
        this.boat_images.push(file)
        reader.onload = (event) => {
          this.boat_images_url.push((<FileReader>event.target).result);
        }
      }
    }    
    // const file = event.target.files && event.target.files[0];
    // if (file) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   if(file.type.indexOf('image')> -1){
    //     this.boat_images = file
    //     reader.onload = (event) => {
    //       this.cover_image_url = (<FileReader>event.target).result;
    //     }
    //   } else if(file.type.indexOf('video')> -1){
    //     this.boat_images = file
    //     reader.onload = (event) => {
    //       this.cover_image_url = (<FileReader>event.target).result;
    //     }
    //   }
    // }
    Notiflix.Loading.remove();
  }

  removeCoverImage() {
    this.cover_image_url = undefined
    this.cover_image = undefined
  }

  remove_image(index: any) {
    this.boat_images_url.splice(index, 1)
    this.boat_images.splice(index, 1)
  }
  
  remove_image_all() {
    this.boat_images_url = []
    this.boat_images = []
  }

  resetForm() {
    this.boatInfoForm.reset()
    this.boatInfoById = []
    this.removeCoverImage()
    this.remove_image_all()
    this.show_form = false;
  }


  submitData() {    
    if (this.boatInfoForm.value._id != null) {
      if (this.boatInfoForm.pristine && !this.cover_image && !this.boat_images) {
        return;
      }
  
      const { value } = this.boatInfoForm;
      value.cover_image = this.cover_image
      value.boat_images = this.boat_images  
  
      console.log(value);
  
      var fd = new FormData();
      fd.append('boat_type', value.boat_type);
      fd.append('name', value.boat_info.name);
      fd.append('width', value.boat_info.width);
      fd.append('mfg_year', value.boat_info.mfg_year);
      fd.append('manufacturer', value.boat_info.manufacturer);
      fd.append('guest_capacity', value.boat_info.guest_capacity);
      fd.append('crew_capacity', value.boat_info.crew_capacity);
      fd.append('engine_type', value.boat_info.engine_type);
      fd.append('top_speed', value.boat_info.top_speed);
      fd.append('interior', value.boat_info.interior);
      fd.append('exterior', value.boat_info.exterior);
      fd.append('price', value.boat_info.price);
      fd.append('cover_image', value.cover_image);
      for (let i=0;i<value.boat_images.length;i++) {
        fd.append('boat_images', value.boat_images[i]);
      }
  
      Notiflix.Loading.standard({
        cssAnimationDuration: 2000,
        backgroundColor: '0, 0, 0, 0.0',
      },
      )
  
      this.editBoatInfoService.updateBoatInfo(this.boatInfoForm.value._id, fd).subscribe(
        res => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(res.body.message);
          this.getBoatInfoById(this.boatInfoForm.value._id)
          this.remove_image_all()
          if (!res.body.success) { Notiflix.Notify.failure(res.body.error); }
        },
        err => {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(err.error?.message);
        }
      )
    } else {

      if (this.boatInfoForm.pristine && !this.cover_image && !this.boat_images) {
        return;
      }
  
      const { value } = this.boatInfoForm;
      value.cover_image = this.cover_image
      value.boat_images = this.boat_images
  
      console.log(value);
  
      var fd = new FormData();
      fd.append('boat_type', value.boat_type);
      fd.append('name', value.boat_info.name);
      fd.append('width', value.boat_info.width);
      fd.append('mfg_year', value.boat_info.mfg_year);
      fd.append('manufacturer', value.boat_info.manufacturer);
      fd.append('guest_capacity', value.boat_info.guest_capacity);
      fd.append('crew_capacity', value.boat_info.crew_capacity);
      fd.append('engine_type', value.boat_info.engine_type);
      fd.append('top_speed', value.boat_info.top_speed);
      fd.append('interior', value.boat_info.interior);
      fd.append('exterior', value.boat_info.exterior);
      fd.append('price', value.boat_info.price);
      fd.append('cover_image', value.cover_image);
      for (let i=0;i<value.boat_images.length;i++) {
        fd.append('boat_images', value.boat_images[i]);
      }
  
      Notiflix.Loading.standard({
        cssAnimationDuration: 2000,
        backgroundColor: '0, 0, 0, 0.0',
      },
      )
  
      this.editBoatInfoService.insertBoatInfo(fd).subscribe(
        res => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(res.body.message);
          this.getBoatInfoAll()
          this.resetForm()
          if (!res.body.success) { Notiflix.Notify.failure(res.body.error); }
        },
        err => {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(err.error?.message);
        }
      )
    }

  }

}
