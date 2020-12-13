import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  employeeForm: FormGroup;
  _id = '';
  name = '';
  cmpName = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getEmployeeById(this.route.snapshot.params.id);
    this.employeeForm = this.formBuilder.group({
      name : [null, Validators.required],
      cmpName : [null, Validators.required],
     });
  }

  getEmployeeById(id: any) {
    this.api.getEmployeeById(id).subscribe((data: any) => {
      this._id = data._id;
      this.employeeForm.setValue({
        name: data.name,
        cmpName: data.gender,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateEmployee(this._id, this.employeeForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/employee-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  employeeDetails() {
    this.router.navigate(['/employee-details', this._id]);
  }

}
