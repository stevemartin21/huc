import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateDataService } from '../../services/create-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private mode = 'create';

  constructor(private createDataService: CreateDataService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required]}),
      email: new FormControl(null, { validators: [Validators.required]}),
      password: new FormControl(null, { validators: [Validators.required]}),
    });
  }

  onRegister() {

    if (this.form.invalid) {
      return;
    }

    this.createDataService.createUser(
      null,
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
       );
       this.form.reset();
  }

}
