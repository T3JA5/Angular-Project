import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [

  {
    path: 'employee',
    component: EmployeeComponent,
    data: { title: 'List of employee' }
  },
  {
    path: 'employee-details/:id',
    component: EmployeeDetailsComponent,
    data: { title: 'employee Details' }
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    data: { title: 'Add employee' }
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
    data: { title: 'Edit employee' }
  },
  { path: '',
    redirectTo: '/employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
}
