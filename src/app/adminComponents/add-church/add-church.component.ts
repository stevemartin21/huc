import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Church } from '../../models/church.model';
import { CreateDataService } from '../../services/create-data.service';
import { ReadDataService } from '../../services/read-data.service';
import { UpdateDataService } from '../../services/update-data.service';


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
  private churchId: string;
  church: Church;

  constructor(private createDataService: CreateDataService,
    public route: ActivatedRoute,
    private readDataService: ReadDataService,
    private updateDataService: UpdateDataService,
    private router: Router ) { }

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

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('churchId')) {
        this.mode = 'edit';
        this.churchId = paramMap.get('churchId');
        this.readDataService.getChurch(this.churchId).subscribe(church => {
          this.church = {
            _id: church._id,
            title: church.title,
            denomination: church.denomination,
            city: church.city,
            county: church.county,
            year: church.year,
            history: church.history,
            imagePath: church.imagePath
          };

          this.form.setValue({
            title: this.church.title,
            denomination: this.church.denomination,
            city: this.church.city,
            county: this.church.county,
            year: this.church.year,
            history: this.church.history,
            image: this.church.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.churchId = null;
      }
    } );


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
    if (this.mode === 'create') {
      this.createDataService.createChurch(
        this.form.value.title,
         this.form.value.year,
         this.form.value.denomination,
         this.form.value.city,
         this.form.value.county,
         this.form.value.history,
         this.form.value.image );
         this.router.navigate(['/dashboard']);
    } else {
      console.log('Or eldse update church');
      this.updateDataService.updateChurch(
        this.churchId,
        this.form.value.title,
        this.form.value.year,
        this.form.value.denomination,
        this.form.value.city,
        this.form.value.county,
        this.form.value.history,
        this.form.value.image
      );
      this.router.navigate(['/dashboard']);
    }

  }



}


