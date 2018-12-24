import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-church',
  templateUrl: './add-church.component.html',
  styleUrls: ['./add-church.component.scss']
})
export class AddChurchComponent implements OnInit {

  form: FormGroup;
  typeSelect: Array<any>;

  constructor() { }

  ngOnInit() {

    this.typeSelect = [

      { value: 'Business Operations', label: 'Business Operations' },
      { value: 'Business Development', label: 'Business Development' },
      { value: 'Sales', label: 'Sales' },
      { value: 'Client Experience', label: 'Client Experience' },
  ];



    this.form = new FormGroup({

    });
  }

  onSaveChurch() {

  }

}
