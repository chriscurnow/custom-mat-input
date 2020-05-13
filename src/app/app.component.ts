import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
   title = 'ngx-material-tools-demo';

  constructor(private formBuilder: FormBuilder) {
  }

  myForm = this.formBuilder.group({
    deposit: ['', [
      Validators.required, // Validators
      Validators.min(1),
      Validators.max(1000000)
    ]],
  });

  onSubmit() {
    console.log('Result', this.myForm.value)
    // some operations here
  }
}
