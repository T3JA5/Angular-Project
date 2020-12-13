import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee = { _id: '', name: '', cmpName: ''};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getEmployeeDetails(id: string) {
    this.api.getEmployeeById(id)
      .subscribe((data: any) => {
        this.employee = data;
        console.log(this.employee);
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {

    this.getEmployeeDetails(this.route.snapshot.params.id);
  }

  deleteEmployee(id: any) {
    this.isLoadingResults = true;
    this.api.deleteEmployee(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/employee']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


}
