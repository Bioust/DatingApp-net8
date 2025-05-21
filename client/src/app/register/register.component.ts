import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // @Input()  FromUserComponent : any;
  // FromUserComponent = input.required<any>();
  // @Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();
  registerForm : FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: string[] | undefined;


  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true};
    }
  }

  initializeForm () {
    this.registerForm = this.fb.group({
      gender: ['male'],
      knownas: ['',Validators.required],
      dateofbirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      username : ['', Validators.required],
      password : ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmpassword : ['', [Validators.required,this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmpassword'].updateValueAndValidity()
    });
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateofbirth')?.value);
    this.registerForm.patchValue({dateofbirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => 
        this.router.navigateByUrl('/members'),
        // Instead of clearing the input fields and console the response we will login and redirect the user
        // console.log(response);
        // this.cancel();
      
      error: error => this.validationErrors = error
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }

}
