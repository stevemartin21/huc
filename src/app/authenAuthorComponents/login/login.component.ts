import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateDataService } from '../../services/create-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  mode = 'create';

  constructor(private createDataService: CreateDataService) { }

  ngOnInit() {
    this.form = new FormGroup(
      {email: new FormControl(null, {validators: [Validators.required] }),
      password: new FormControl(null, {validators:[Validators.required] })
    });
  }

  onLogin() {

    if (this.form.invalid) {
      return;
    }

    this.createDataService.createToken(
      this.form.value.email,
      this.form.value.password
    );

  }

}
