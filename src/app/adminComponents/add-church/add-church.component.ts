import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CreateDataService } from '../../services/create-data.service';

import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-add-church',
  templateUrl: './add-church.component.html',
  styleUrls: ['./add-church.component.scss']
})
export class AddChurchComponent implements OnInit {

  form: FormGroup;
  typeSelect: Array<any>;
  mode = 'create';
  imagePreview: string;

  constructor(private createDataService: CreateDataService ) { }

  ngOnInit() {

    this.typeSelect = [

      { value: 'Baptist', label: 'Baptist' },
      { value: 'Catholic', label: 'Catholic' },
      { value: 'Latter Day Saint', label: 'Latter Day Saint' },
      { value: 'Methodist', label: 'Methodist' },
  ];



    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required] }),
      history: new FormControl(null, {validators: [Validators.required] }),
      year: new FormControl(null, {validators: [Validators.required] }),
      denomination: new FormControl(null, {validators: [Validators.required] }),
      city: new FormControl(null, {validators: [Validators.required] }),
      county: new FormControl(null, {validators: [Validators.required] }),
      image: new FormControl(null,
        {validators: [Validators.required],
          asyncValidators: [mimeType] })

    });
  }

  onImagePicked(event: Event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }



  onSaveChurch() {

    if (this.form.invalid) {
      return;
    }
    this.createDataService.createChurch(
    this.form.value.title,
     this.form.value.year,
     this.form.value.denomination,
     this.form.value.city,
     this.form.value.county,
     this.form.value.history,
     this.form.value.image );
     this.form.reset();
  }



}

/*
export interface Church {
  id: String;
  title: String;
  history: String;
  year: String;
  denomination: String;
  city: String;
  county: String;
  imagePath: String;
}


*/
