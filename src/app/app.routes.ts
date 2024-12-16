import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  },
  {
    path: 'createEmployee',
    component: CreateEmployeeComponent
  },
  {
    path: 'updateEmployee/:id',
    component: UpdateEmployeeComponent
  }
];
