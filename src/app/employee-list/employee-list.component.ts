import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, FormEmployeeComponent],
  providers: [EmployeeServiceService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  employees: Employee[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', emailId: 'doe@mail.com' },
    { id: 2, firstName: 'Anna', lastName: 'Smith', emailId: 'sm@mail.com' },
  ];
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe({
      next: (employees: Employee[]) => {
        //console.log('employees:..', employees);
        this.employees = employees;
      },
      error: (error: any) => {
        console.log('getEmployees error:..', error);
      },
    });
  }

  onSelected(employee: Employee) {
    console.log('Selected employee:..', employee);
    this.selectedEmployee = employee;
  }

  onEdit(employee: Employee) {
    console.log('Edit employee:..', employee);
    this.router.navigate(['/updateEmployee', employee.id]);
  }

  onDelete(employee: Employee) {
    console.log('Delete employee:..', employee);
    this.selectedEmployee = employee;
    console.log('selectedEmployee employee :..', this.selectedEmployee);
  }

  deleteEmployee(e: any) {
    console.log('employeeList deleteEmployee:..', e);

    this.employeeService.deleteEmployee(e.id).subscribe({
       next: (response: any) => {
        console.log('response:..', response);
        this.getEmployees();
        this.selectedEmployee = null;
      },
      error: (error: any) => {
        console.log('deleteEmployee error:..', error);
      },
    });
  }

}
