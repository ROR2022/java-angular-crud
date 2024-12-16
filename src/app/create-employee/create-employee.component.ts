import { Component } from '@angular/core';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormEmployeeComponent],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
    employee!: Employee;

    constructor(
        private employeeService: EmployeeServiceService,
        private router: Router
    ) {
        this.employee = new Employee();
    }

    createEmployee(e: Employee) {
        console.log('Create Employee  dataForm ',e);
        this.employeeService.createEmployee(e).subscribe(
            {
                next: data => {
                    console.log('Employee created successfully!', data);
                    this.router.navigate(['/employees']);
                },
                error: error => {
                    console.error('Error creating employee!', error);
                }
            }
        );
    }
}
